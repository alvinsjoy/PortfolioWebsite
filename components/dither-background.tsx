'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Dither = dynamic(() => import('@/components/dither/Dither'), {
  ssr: false,
});

/*
  Themed mount for React Bits' <Dither /> (components/dither/Dither.jsx,
  used with a few clearly-marked integration patches for transparency and
  window-level mouse tracking). The wrapper only supplies theme colors
  from globals.css and tames the intensity with opacity + masks; there is
  no blend-mode or synthetic-event trickery, so the behavior is the same
  in every engine.
*/

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

export default function DitherBackground({
  className,
}: {
  className?: string;
}) {
  const [waveColor, setWaveColor] = useState<[number, number, number]>([
    0.5, 0.5, 0.5,
  ]);

  useEffect(() => {
    const applyTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      const glow = hslVarToRgb(styles.getPropertyValue('--glow')) ?? [
        0.3, 0.7, 0.6,
      ];
      setWaveColor(glow);
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => themeObserver.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none opacity-55 dark:opacity-45',
        // fade out toward the bottom and soften over the text column
        '[mask-composite:intersect] [mask-image:linear-gradient(to_bottom,black_50%,transparent),linear-gradient(105deg,rgb(0_0_0/0.4)_25%,black_60%)]',
        className,
      )}
    >
      <Dither
        waveColor={waveColor}
        colorNum={4}
        pixelSize={2}
        waveSpeed={0.05}
        waveFrequency={3}
        waveAmplitude={0.3}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        disableAnimation={false}
      />
    </div>
  );
}
