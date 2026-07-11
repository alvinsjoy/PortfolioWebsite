import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: string;
};

export default function Marquee({
  children,
  className,
  reverse = false,
  duration = '45s',
}: MarqueeProps) {
  return (
    <div
      className={cn('mask-fade-x group flex overflow-hidden', className)}
      style={
        {
          '--marquee-duration': duration,
          '--marquee-gap': '0.75rem',
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'flex w-max shrink-0 items-center gap-[var(--marquee-gap)] pr-[var(--marquee-gap)] group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
