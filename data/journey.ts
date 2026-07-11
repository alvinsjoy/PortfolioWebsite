export type JourneyEntry = {
  title: string;
  org: string;
  orgLink?: string;
  period: string;
  description: string;
  tags?: string[];
};

export const work: JourneyEntry[] = [
  {
    title: 'Software Engineer',
    org: 'Zimble Systems',
    orgLink: 'https://zimblesystems.com',
    period: 'Since 2026',
    description:
      'Building products with Flutter and Go: mobile apps, the backend services behind them and everything between.',
    tags: ['Flutter', 'Go'],
  },
];

export const education: JourneyEntry[] = [
  {
    title: 'B.Tech, Computer Science & Engineering',
    org: 'Govt. Model Engineering College, Kochi',
    orgLink: 'https://mec.ac.in',
    period: '2022 to 2026',
    description:
      'Undergraduate degree in CSE: data structures, systems, networks and databases, alongside a lot of late-night side projects.',
    tags: ['CSE', 'Kochi'],
  },
];
