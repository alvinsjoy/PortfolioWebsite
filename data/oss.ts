export type Contribution = {
  repo: string;
  title: string;
  type: 'pr' | 'issue';
  url: string;
};

export const contributions: Contribution[] = [
  {
    repo: 'highlightjs/highlight.js',
    title:
      'Add contextual C# keywords: file, args, dynamic, record, required and scoped',
    type: 'pr',
    url: 'https://github.com/highlightjs/highlight.js/pull/4087',
  },
  {
    repo: 'highlightjs/highlight.js',
    title: 'Add goto to be recognized as a Java keyword',
    type: 'pr',
    url: 'https://github.com/highlightjs/highlight.js/pull/3963',
  },
  {
    repo: 'highlightjs/highlight.js',
    title: 'Add sudo keyword to Bash highlighting',
    type: 'pr',
    url: 'https://github.com/highlightjs/highlight.js/pull/3977',
  },
  {
    repo: 'microsoft/winget-cli',
    title: "Use GitHub's built-in markdown highlighting for README notes",
    type: 'pr',
    url: 'https://github.com/microsoft/winget-cli/pull/4441',
  },
  {
    repo: 'zen-browser/desktop',
    title: 'Use list-style rather than menu for appMenu items',
    type: 'pr',
    url: 'https://github.com/zen-browser/desktop/pull/7989',
  },
  {
    repo: 'zen-browser/desktop',
    title: "Media controller mute does not update the 'Mute Tab' button state",
    type: 'issue',
    url: 'https://github.com/zen-browser/desktop/issues/7798',
  },
  {
    repo: 'ente-io/ente',
    title: 'Remove hex for LinkedIn icon in Auth',
    type: 'pr',
    url: 'https://github.com/ente-io/ente/pull/5727',
  },
  {
    repo: 'zaidmukaddam/scira',
    title: 'Use resolvedTheme for accurate theme management',
    type: 'pr',
    url: 'https://github.com/zaidmukaddam/scira/pull/105',
  },
  {
    repo: 'vercel/next.js',
    title: 'eslint-config-next should allow eslint 9.x as a peer dependency',
    type: 'issue',
    url: 'https://github.com/vercel/next.js/issues/64853',
  },
  {
    repo: 'cli/cli',
    title: 'gh pr lock does not accept a URL despite the manual saying so',
    type: 'issue',
    url: 'https://github.com/cli/cli/issues/8816',
  },
  {
    repo: 'highlightjs/highlight.js',
    title: 'Java: reserved keyword goto is not highlighted',
    type: 'issue',
    url: 'https://github.com/highlightjs/highlight.js/issues/3962',
  },
  {
    repo: 'fossunited/fossunited',
    title: 'Unable to update profile due to a username availability error',
    type: 'issue',
    url: 'https://github.com/fossunited/fossunited/issues/505',
  },
  {
    repo: 'tandpfun/skill-icons',
    title: 'Add support for prefers-color-scheme',
    type: 'issue',
    url: 'https://github.com/tandpfun/skill-icons/issues/986',
  },
  {
    repo: 'hsuanyi-chou/shadcn-ui-expansions',
    title: 'Add issue templates',
    type: 'pr',
    url: 'https://github.com/hsuanyi-chou/shadcn-ui-expansions/pull/94',
  },
  {
    repo: 'clerk/clerk-docs',
    title: 'Remove duplicate text',
    type: 'pr',
    url: 'https://github.com/clerk/clerk-docs/pull/1425',
  },
  {
    repo: 'wdhdev/free-for-life',
    title: 'Add Formbricks and refactor form service descriptions',
    type: 'pr',
    url: 'https://github.com/wdhdev/free-for-life/pull/99',
  },
  {
    repo: 'jamaljm/snapcv',
    title: 'Fix toast links',
    type: 'pr',
    url: 'https://github.com/jamaljm/snapcv/pull/4',
  },
];
