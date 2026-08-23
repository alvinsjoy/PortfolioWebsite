import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  /* the page-level heading on a route passes `as="h1"`; section
     headings inside a page keep the default h2 */
  as?: 'h1' | 'h2';
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <Heading className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-3 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
