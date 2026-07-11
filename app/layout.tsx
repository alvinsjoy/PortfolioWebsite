import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/components/providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import '@/styles/globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

const description =
  'Full-stack developer from Kerala, India building interactive apps with Next.js, TypeScript and Flutter. Software engineer at Zimble Systems and open source contributor.';

export const metadata: Metadata = {
  metadataBase: new URL('https://alvin.is-a.dev'),
  title: {
    default: 'Alvin Joy · Full-stack Developer',
    template: '%s · Alvin Joy',
  },
  description,
  keywords: [
    'portfolio',
    'alvin joy',
    'full-stack developer',
    'javascript',
    'typescript',
    'next.js',
    'kerala',
  ],
  authors: [{ name: 'Alvin Joy' }],
  openGraph: {
    title: 'Alvin Joy · Full-stack Developer',
    description,
    url: 'https://alvin.is-a.dev',
    siteName: 'Alvin Joy',
    images: ['/assets/Mac.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alvin Joy · Full-stack Developer',
    description,
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
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        <Providers>
          <div aria-hidden="true" className="ambient" />
          <div aria-hidden="true" className="grain" />
          <Navbar />
          <main className="pt-32">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
