'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/*
  Liquid glass, following https://kube.io/blog/liquid-glass-css-svg/ :

  The glass surface is a convex squircle bezel. For each distance into the
  bezel we refract a vertical light ray through the surface (Snell's law,
  glass index 1.5) and measure how far it lands sideways: that horizontal
  shift is encoded into a displacement map (R = x, G = y, 128 = neutral)
  which Chromium applies to the backdrop via backdrop-filter: url().
  The result is the signature look: clear center, a ring of refraction at
  the rim. Displacement peaks mid-bezel and reaches zero at both ends,
  exactly like the article's profile.

  The refraction fades in via a CSS opacity animation on the layer
  (.glass-refraction in globals.css); the filter scale itself stays
  constant so the effect can never get stuck mid-animation.
*/

const BEZEL = 14; // px width of the curved rim
const THICKNESS = 22; // px of virtual glass under the surface
const IOR = 1.5; // refraction index of glass
const LEVEL = 0.85; // article's default refraction level range is 0.7-1.0

// convex squircle: y = (1 - (1-x)^4)^(1/4), Apple's preferred profile
function surfaceProfile(t: number) {
  const u = 1 - t;
  return Math.pow(1 - u * u * u * u, 0.25);
}

// horizontal refraction shift (px) for each normalized bezel distance
function displacementProfile(samples: number) {
  const mags = new Float64Array(samples);
  const eps = 1 / samples;
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const y1 = surfaceProfile(Math.max(0, t - eps));
    const y2 = surfaceProfile(Math.min(1, t + eps));
    const slope = ((y2 - y1) * THICKNESS) / (2 * eps * BEZEL);
    const phi = Math.min(Math.atan(slope), 1.3); // surface normal tilt, clamped
    const thetaT = Math.asin(Math.sin(phi) / IOR);
    const drop = surfaceProfile(t) * THICKNESS; // path length inside the glass
    mags[i] = drop * Math.tan(phi - thetaT);
  }
  return mags;
}

function buildDisplacementMap(width: number, height: number) {
  const w = Math.max(2, Math.round(width));
  const h = Math.max(2, Math.round(height));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const radius = Math.min(w, h) / 2;
  const bezel = Math.min(BEZEL, radius);
  const cx = w / 2;
  const cy = h / 2;

  // signed distance to a pill shape, negative inside
  const sdf = (x: number, y: number) => {
    const qx = Math.abs(x - cx) - (w / 2 - radius);
    const qy = Math.abs(y - cy) - (h / 2 - radius);
    return (
      Math.min(Math.max(qx, qy), 0) +
      Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
      radius
    );
  };

  const SAMPLES = 127;
  const mags = displacementProfile(SAMPLES);
  const maxMag = mags.reduce((a, b) => Math.max(a, b), 0) || 1;

  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const inside = -sdf(x + 0.5, y + 0.5);
      let dx = 0;
      let dy = 0;
      if (inside > 0 && inside < bezel) {
        const t = inside / bezel;
        const mag = mags[Math.round(t * (SAMPLES - 1))] / maxMag;
        // outward normal from the sdf gradient
        const gx = sdf(x + 1.5, y + 0.5) - sdf(x - 0.5, y + 0.5);
        const gy = sdf(x + 0.5, y + 1.5) - sdf(x + 0.5, y - 0.5);
        const len = Math.hypot(gx, gy) || 1;
        dx = (gx / len) * mag;
        dy = (gy / len) * mag;
      }
      img.data[i] = Math.round(128 + dx * 127);
      img.data[i + 1] = Math.round(128 + dy * 127);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return { url: canvas.toDataURL(), maxScale: maxMag * LEVEL };
}

// Chromium is the only engine that renders SVG filters in backdrop-filter,
// and CSS.supports() lies about it, so sniff the engine directly
function isChromium() {
  return (
    typeof navigator !== 'undefined' &&
    /Chrom(e|ium)/.test(navigator.userAgent)
  );
}

type LiquidGlassProps = {
  children: React.ReactNode;
  className?: string;
};

export default function LiquidGlass({ children, className }: LiquidGlassProps) {
  const filterId = `lg-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<{
    url: string;
    w: number;
    h: number;
    maxScale: number;
  } | null>(null);

  useEffect(() => {
    if (!isChromium()) return;
    const el = ref.current;
    if (!el) return;

    let last = { w: 0, h: 0 };
    const regenerate = () => {
      const { width, height } = el.getBoundingClientRect();
      const w = Math.round(width);
      const h = Math.round(height);
      if (w < 2 || h < 2 || (w === last.w && h === last.h)) return;
      last = { w, h };
      const result = buildDisplacementMap(w, h);
      if (result) setMap({ url: result.url, w, h, maxScale: result.maxScale });
    };

    regenerate();
    const observer = new ResizeObserver(regenerate);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'liquid-glass relative isolate overflow-hidden rounded-full',
        className,
      )}
    >
      {/* refraction (Chromium) or frosted blur (everyone else) */}
      <span
        aria-hidden="true"
        className="glass-refraction absolute inset-0 -z-30 rounded-full"
        style={
          map
            ? {
                backdropFilter: `url(#${filterId}) blur(1px) saturate(180%)`,
                WebkitBackdropFilter: `url(#${filterId}) blur(1px) saturate(180%)`,
              }
            : undefined
        }
      />
      {/* translucent tint */}
      <span
        aria-hidden="true"
        className="glass-tint absolute inset-0 -z-20 rounded-full"
      />
      {/* specular rim + diagonal sheen */}
      <span
        aria-hidden="true"
        className="glass-shine absolute inset-0 -z-10 rounded-full"
      />

      {children}

      {map && (
        <svg aria-hidden="true" className="absolute h-0 w-0">
          <filter
            id={filterId}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={map.url}
              x="0"
              y="0"
              width={map.w}
              height={map.h}
              result="map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={map.maxScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
    </div>
  );
}
