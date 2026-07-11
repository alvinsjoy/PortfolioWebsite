import { LuArrowUpRight } from 'react-icons/lu';
import BlurFade from '@/components/blur-fade';
import { Badge } from '@/components/ui/badge';
import type { JourneyEntry } from '@/data/journey';

export default function Timeline({ entries }: { entries: JourneyEntry[] }) {
  return (
    <ol className="relative ml-3 border-l border-border/80">
      {entries.map((entry, i) => (
        <li
          key={entry.title + entry.org}
          className="relative pb-10 pl-8 last:pb-0"
        >
          {/* timeline dot */}
          <span
            aria-hidden="true"
            className="absolute -left-[5px] top-1.5 size-[9px] rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]"
          />
          <BlurFade delay={i * 0.08}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {entry.period}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
              {entry.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {entry.orgLink ? (
                <a
                  href={entry.orgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 transition-colors hover:text-primary"
                >
                  {entry.org}
                  <LuArrowUpRight className="size-3.5" />
                </a>
              ) : (
                entry.org
              )}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
            {entry.tags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </BlurFade>
        </li>
      ))}
    </ol>
  );
}
