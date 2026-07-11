'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/*
  Dithered light rays, in the style of signoz.io's hero: a WebGL shader
  draws diagonal beams quantized through an ordered Bayer dither so they
  render as retro dot clusters. The beams drift slowly with time and
  brighten around the pointer. Colors come from the theme's --glow and
  --glow-2 variables so the effect follows light/dark mode.
*/

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_alpha;

float bayer(vec2 cell) {
  // 4x4 ordered dither matrix, normalized to 0..1
  vec2 p = mod(cell, 4.0);
  float i = p.y * 4.0 + p.x;
  float v = 0.0;
  if (i < 0.5) v = 0.0;  else if (i < 1.5) v = 8.0;
  else if (i < 2.5) v = 2.0;  else if (i < 3.5) v = 10.0;
  else if (i < 4.5) v = 12.0; else if (i < 5.5) v = 4.0;
  else if (i < 6.5) v = 14.0; else if (i < 7.5) v = 6.0;
  else if (i < 8.5) v = 3.0;  else if (i < 9.5) v = 11.0;
  else if (i < 10.5) v = 1.0; else if (i < 11.5) v = 9.0;
  else if (i < 12.5) v = 15.0; else if (i < 13.5) v = 7.0;
  else if (i < 14.5) v = 13.0; else v = 5.0;
  return (v + 0.5) / 16.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;

  // rotate so the beams rake in from the top right
  float ang = radians(-34.0);
  float x = cos(ang) * uv.x - sin(ang) * uv.y;

  // layered drifting sines make uneven beams
  float b1 = sin(x * 14.0 + u_time * 0.35) * 0.5 + 0.5;
  float b2 = sin(x * 5.0 - u_time * 0.14 + 1.7) * 0.5 + 0.5;
  float b3 = sin(x * 27.0 + u_time * 0.2 + 4.2) * 0.5 + 0.5;
  float beams = pow(b1 * (0.4 + 0.6 * b2), 2.4) * (0.55 + 0.45 * b3);

  // strongest at the top, gone by the bottom of the band
  float fall = smoothstep(1.05, 0.0, 1.0 - uv.y);
  fall *= smoothstep(0.0, 0.25, uv.y);

  // pointer light: beams bloom near the cursor
  float d = distance(gl_FragCoord.xy, u_mouse);
  float glow = exp(-d / (u_res.y * 0.32));
  float v = beams * fall * (0.5 + 0.9 * glow);

  // quantize through the dither matrix in 2px cells
  float dotOn = step(bayer(floor(gl_FragCoord.xy / 2.0)), v);

  vec3 col = mix(u_color1, u_color2, clamp(uv.x + (uv.y - 0.5) * 0.4, 0.0, 1.0));
  gl_FragColor = vec4(col, dotOn * min(v * 1.6, 1.0) * u_alpha);
}`;

function hslVarToRgb(raw: string): [number, number, number] | null {
  // parses shadcn-style "174 70% 40%" triplets
  const m = raw.trim().match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!m) return null;
  const h = Number(m[1]) / 360;
  const s = Number(m[2]) / 100;
  const l = Number(m[3]) / 100;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    let u = t;
    if (u < 0) u += 1;
    if (u > 1) u -= 1;
    if (u < 1 / 6) return p + (q - p) * 6 * u;
    if (u < 1 / 2) return q;
    if (u < 2 / 3) return p + (q - p) * (2 / 3 - u) * 6;
    return p;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)];
}

export default function HeroRays({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return; // no WebGL: the aurora backdrop still carries the page

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uAlpha = gl.getUniformLocation(program, 'u_alpha');

    // theme: pull --glow/--glow-2 and pick strength per mode
    const applyTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      const c1 = hslVarToRgb(styles.getPropertyValue('--glow')) ?? [0.2, 0.7, 0.6];
      const c2 = hslVarToRgb(styles.getPropertyValue('--glow-2')) ?? [0.4, 0.5, 0.9];
      const dark = document.documentElement.classList.contains('dark');
      gl.uniform3f(uColor1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uColor2, c2[0], c2[1], c2[2]);
      gl.uniform1f(uAlpha, dark ? 0.5 : 0.35);
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // dither dots stay chunky at dpr 1, like the original
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(rect.width));
      canvas.height = Math.max(2, Math.round(rect.height));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // pointer, in canvas pixels with gl's bottom-left origin; eased for a
    // liquid feel
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = rect.height - (e.clientY - rect.top);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let raf = 0;
    let running = true;
    const start = performance.now();
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      gl.uniform1f(uTime, reduceMotion ? 0 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running) raf = requestAnimationFrame(draw);
    };

    // only burn GPU while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none [mask-image:linear-gradient(to_bottom,black_55%,transparent)]',
        className,
      )}
    />
  );
}
