'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SpotlightCard({
  children,
  className,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--sy', `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/70 bg-card',
        'transition-colors duration-300 hover:border-primary/30',
        className,
      )}
    >
      {/* pointer-tracking spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--sx, 50%) var(--sy, 50%), hsl(var(--glow) / 0.09), transparent 65%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
