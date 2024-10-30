import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Provider from '@/components/Provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Title */}
        <title>Profile | Alvin Joy</title>

        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future."
        />
        <meta
          name="keywords"
          content="portfolio, alvin joy, skill, javascript, alvin, profile"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Alvin Joy" />
        {/* Twitter */}
        <meta name="twitter:title" content="Profile | Alvin Joy" />
        <meta
          name="twitter:description"
          content="JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future."
        />
        <meta name="twitter:image:src" content="/assets/Mac.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_alvinjoy_" />
        {/* Open Graph (Facebook) */}
        <meta property="og:url" content="https://alvinjoy.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Profile | Alvin Joy" />
        <meta
          property="og:description"
          content="JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future."
        />
        <meta property="og:image" content="/assets/Mac.png" />
        {/* Google site verification */}
        <meta
          name="google-site-verification"
          content="u4he7KeBVBRlAgWdtNKOs7fEjbfC0-9UR-AuCCJlaWc"
        />
        {/* Mastodon verification */}
        <link rel="me" href="https://mastodon.social/@alvinjoy" />
        {/* Canonical url */}
        <link rel="canonical" href="https://alvin.is-a.dev" />
        {/* Add more meta tags as needed */}

        {/* Favicon (example assuming you have a favicon.ico file in public directory) */}
        <link
          rel="shortcut icon"
          href="/assets/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
      </Head>
      {/* Umami Analytics */}
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="715dc1b3-3a39-44c9-b7c8-f2fc63dc8ae7"
      ></Script>
      <Script src="/oneko.js" strategy="afterInteractive"></Script>
      <Provider>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
