import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/components/providers';
import Navbar from '@/components/nav';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alvin.is-a.dev'),
  title: 'Profile | Alvin Joy',
  description:
    "JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future.",
  keywords: [
    'portfolio',
    'alvin joy',
    'skill',
    'javascript',
    'alvin',
    'profile',
  ],
  authors: [{ name: 'Alvin Joy' }],
  openGraph: {
    title: 'Profile | Alvin Joy',
    description:
      "JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future.",
    url: 'https://alvin.is-a.dev',
    siteName: 'Alvin Joy',
    images: ['/assets/Mac.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile | Alvin Joy',
    description:
      "JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future.",
    site: '@_alvinjoy_',
    images: ['/assets/Mac.png'],
  },
  verification: {
    google: 'u4he7KeBVBRlAgWdtNKOs7fEjbfC0-9UR-AuCCJlaWc',
  },
  alternates: {
    canonical: 'https://alvin.is-a.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href="/assets/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
        <link rel="me" href="https://mastodon.social/@alvinjoy" />
        <script
          defer
          src="/analytics.js"
          data-website-id="715dc1b3-3a39-44c9-b7c8-f2fc63dc8ae7"
        />
        <script defer src="/oneko.js" />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
