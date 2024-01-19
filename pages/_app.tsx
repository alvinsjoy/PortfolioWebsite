// _app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import GAnalytics from "../components/GAnalytics";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Title */}
        <title>Profile | Alvin Joy</title>

        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="JavaScript developer creating interactive apps, skilled in discord.js and exploring Flutter and web development. Eager learner, excited about tech's future." />
        {/* Add more meta tags as needed */}

        {/* Favicon (example assuming you have a favicon.ico file in public directory) */}
        <link rel="shortcut icon" href="/icon.ico" type="image/x-icon" />
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </Head>
      <GAnalytics />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}