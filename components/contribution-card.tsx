import type { IconType } from 'react-icons';
import {
  LuArrowUpRight,
  LuCircleCheck,
  LuCircleDot,
  LuCircleSlash,
  LuGitFork,
  LuGitMerge,
  LuGitPullRequestArrow,
  LuGitPullRequestClosed,
  LuStar,
} from 'react-icons/lu';
import SpotlightCard from '@/components/spotlight-card';
import type { Contribution } from '@/data/oss';
import type {
  ContributionMetrics,
  ContributionState,
  ContributionStatus,
} from '@/lib/github';
import { cn } from '@/lib/utils';

const compact = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});
const compactWhole = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 0,
});
const monthYear = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/* GitHub-style short counts: 56, 1.9k, 26.6k, 144k, 1.2m */
function formatCount(n: number) {
  const format = n >= 100_000 && n < 1_000_000 ? compactWhole : compact;
  return format.format(n).toLowerCase();
}

const STATUS: Record<ContributionState, { label: string; tone?: string }> = {
  merged: { label: 'Merged', tone: 'text-primary' },
  resolved: { label: 'Resolved', tone: 'text-primary' },
  open: { label: 'Open', tone: 'text-foreground' },
  closed: { label: 'Closed' },
  'not-planned': { label: 'Not planned' },
};

function statusIcon(
  type: Contribution['type'],
  state: ContributionState,
): IconType {
  if (state === 'merged') return LuGitMerge;
  if (state === 'resolved') return LuCircleCheck;
  if (state === 'open') {
    return type === 'pr' ? LuGitPullRequestArrow : LuCircleDot;
  }
  return type === 'pr' ? LuGitPullRequestClosed : LuCircleSlash;
}

function Metric({
  icon: Icon,
  value,
  unit,
}: {
  icon: IconType;
  value: number;
  unit: string;
}) {
  const label = `${unit}${value === 1 ? '' : 's'}`;
  return (
    <span
      title={`${value.toLocaleString('en')} ${label}`}
      className="inline-flex items-center gap-1"
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {formatCount(value)}
      <span className="sr-only"> {label}</span>
    </span>
  );
}

function Status({
  type,
  status,
}: {
  type: Contribution['type'];
  status: ContributionStatus;
}) {
  const { label, tone } = STATUS[status.state];
  const Icon = statusIcon(type, status.state);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('inline-flex items-center gap-1 font-medium', tone)}>
        <Icon aria-hidden="true" className="size-3.5" />
        {label}
      </span>
      <span aria-hidden="true">·</span>
      <time dateTime={status.date}>
        {monthYear.format(new Date(status.date))}
      </time>
    </span>
  );
}

export default function ContributionCard({
  contribution,
  metrics,
}: {
  contribution: Contribution;
  metrics?: ContributionMetrics;
}) {
  const { repo, status } = metrics ?? {};

  return (
    <SpotlightCard className="h-full rounded-xl">
      <a
        href={contribution.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link flex h-full flex-col gap-3.5 p-4"
      >
        <span className="flex items-start gap-3">
          {contribution.type === 'pr' ? (
            <LuGitPullRequestArrow
              title="Pull request"
              className="mt-0.5 size-4 shrink-0 text-primary"
            />
          ) : (
            <LuCircleDot
              title="Issue"
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            />
          )}
          <span className="flex-1">
            <span className="block font-mono text-xs text-muted-foreground">
              {contribution.repo}
            </span>
            <span className="mt-1 block text-sm font-medium leading-snug">
              {contribution.title}
            </span>
          </span>
          <LuArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-foreground" />
        </span>

        {/* live from GitHub; cards simply render without this row if
            the numbers could not be fetched */}
        {(repo || status) && (
          <span className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 pl-7 font-mono text-xs text-muted-foreground">
            {repo && (
              <span className="flex items-center gap-3.5 tabular-nums">
                <Metric icon={LuStar} value={repo.stars} unit="star" />
                <Metric icon={LuGitFork} value={repo.forks} unit="fork" />
              </span>
            )}
            {status && <Status type={contribution.type} status={status} />}
          </span>
        )}
      </a>
    </SpotlightCard>
  );
}
