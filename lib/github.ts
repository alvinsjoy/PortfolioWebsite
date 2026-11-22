import type { Contribution } from '@/data/oss';

/*
  Live numbers for the open source cards, read from GitHub's public
  Search API with no login.

  Unauthenticated search allows 10 requests a minute per IP, and this
  needs exactly two however many contributions are listed: one returns
  every repo's stars and forks, the other every pull request and issue
  with its current state. Next caches both responses and regenerates
  the page in the background at most once an hour (ISR), so visitors
  never call GitHub themselves.

  On Vercel that per-IP allowance is shared with other projects, so a
  request that fails anonymously is retried once with GITHUB_TOKEN when
  it is set (30 searches a minute, counted against the token instead of
  the IP). The token is optional and needs no permissions: a
  fine-grained token with public repository access is enough.
*/

const REVALIDATE_SECONDS = 60 * 60;

export type RepoStats = {
  stars: number;
  forks: number;
};

export type ContributionState =
  | 'open'
  | 'merged'
  | 'closed'
  | 'resolved'
  | 'not-planned';

export type ContributionStatus = {
  state: ContributionState;
  /* when it got there: merged, closed, or opened if still open (ISO 8601) */
  date: string;
};

export type ContributionMetrics = {
  repo?: RepoStats;
  status?: ContributionStatus;
};

type RepoItem = {
  full_name: string;
  stargazers_count: number;
  forks_count: number;
};

type IssueItem = {
  html_url: string;
  state: 'open' | 'closed';
  state_reason: string | null;
  created_at: string;
  closed_at: string | null;
  pull_request?: { merged_at: string | null };
};

/* the response, and a short reason for logs: status code or network error */
type Attempt = { res?: Response; reason: string };

async function attempt(url: string, token?: string): Promise<Attempt> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'portfolio-journey-page',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    });
    return { res, reason: String(res.status) };
  } catch (error) {
    return { reason: error instanceof Error ? error.message : String(error) };
  }
}

async function search<T>(
  endpoint: 'repositories' | 'issues',
  query: string,
  token: string | undefined,
): Promise<T[]> {
  const params = new URLSearchParams({ q: query, per_page: '100' });
  const url = `https://api.github.com/search/${endpoint}?${params}`;

  let result = await attempt(url);
  if (!result.res?.ok && token) {
    const anonymous = result.reason;
    result = await attempt(url, token);
    console.info(
      `[journey] GitHub search/${endpoint}: anonymous request failed (${anonymous}), retried with GITHUB_TOKEN (${result.reason})`,
    );
  }
  if (!result.res?.ok) {
    throw new Error(`GitHub search/${endpoint} failed (${result.reason})`);
  }
  const data: { items: T[] } = await result.res.json();
  return data.items;
}

/*
  Once per build, say in the deploy log whether the fallback would work.
  Fine-grained tokens expire, and an expired one would otherwise only
  surface on the day anonymous requests start failing. /rate_limit does
  not count against any rate limit.
*/
async function logTokenStatus(token: string | undefined) {
  if (!token) {
    console.info('[journey] GitHub metrics: anonymous only, no GITHUB_TOKEN');
    return;
  }
  const { res, reason } = await attempt(
    'https://api.github.com/rate_limit',
    token,
  );
  if (res?.ok) {
    const { resources } = await res.json();
    console.info(
      `[journey] GitHub metrics: GITHUB_TOKEN fallback ready (${resources?.search?.limit ?? '?'} searches a minute with it)`,
    );
  } else if (res?.status === 401) {
    console.warn(
      '[journey] GitHub metrics: GITHUB_TOKEN was rejected (401), it has expired or been revoked, so there is no fallback',
    );
  } else {
    console.warn(
      `[journey] GitHub metrics: could not verify GITHUB_TOKEN (${reason})`,
    );
  }
}

function toStatus(item: IssueItem): ContributionStatus {
  const closedAt = item.closed_at ?? item.created_at;

  if (item.pull_request?.merged_at) {
    return { state: 'merged', date: item.pull_request.merged_at };
  }
  if (item.state === 'open') {
    return { state: 'open', date: item.created_at };
  }
  if (!item.pull_request && item.state_reason === 'completed') {
    return { state: 'resolved', date: closedAt };
  }
  if (!item.pull_request && item.state_reason === 'not_planned') {
    return { state: 'not-planned', date: closedAt };
  }
  return { state: 'closed', date: closedAt };
}

/* owner/repo names and their URLs are case-insensitive on GitHub */
const normalize = (value: string) => value.toLowerCase();

function isRejected(
  result: PromiseSettledResult<unknown>,
): result is PromiseRejectedResult {
  return result.status === 'rejected';
}

export async function getContributionMetrics(
  contributions: Contribution[],
  author: string,
): Promise<Map<string, ContributionMetrics>> {
  const token = process.env.GITHUB_TOKEN?.trim() || undefined;
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
  const repos = [...new Set(contributions.map((c) => normalize(c.repo)))];
  const scope = repos.map((repo) => `repo:${repo}`).join(' ');

  if (isBuild) await logTokenStatus(token);

  const [repoResult, issueResult] = await Promise.allSettled([
    search<RepoItem>('repositories', scope, token),
    search<IssueItem>('issues', `author:${author} ${scope}`, token),
  ]);

  const failure = [repoResult, issueResult].find(isRejected);
  if (failure) {
    /* At runtime this only runs as a background ISR regeneration, and a
       regeneration that throws keeps serving the last good page, so a
       rate limit or outage can never wipe numbers already on screen.
       The build (and dev) has no previous page to fall back to: render
       whatever did arrive and leave the rest of the cards bare. */
    if (process.env.NODE_ENV === 'production' && !isBuild) {
      throw failure.reason;
    }
    console.warn('[journey] GitHub metrics unavailable:', failure.reason);
  }

  const stats = new Map(
    (repoResult.status === 'fulfilled' ? repoResult.value : []).map(
      (repo): [string, RepoStats] => [
        normalize(repo.full_name),
        { stars: repo.stargazers_count, forks: repo.forks_count },
      ],
    ),
  );
  const statuses = new Map(
    (issueResult.status === 'fulfilled' ? issueResult.value : []).map(
      (item): [string, ContributionStatus] => [
        normalize(item.html_url),
        toStatus(item),
      ],
    ),
  );

  return new Map(
    contributions.map((c): [string, ContributionMetrics] => [
      c.url,
      {
        repo: stats.get(normalize(c.repo)),
        status: statuses.get(normalize(c.url)),
      },
    ]),
  );
}
