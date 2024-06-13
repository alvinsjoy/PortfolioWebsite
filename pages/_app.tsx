import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GAnalytics from '@/components/GAnalytics';
import { Analytics } from '@vercel/analytics/react';
import gsap from 'gsap';
import Provider from '@/components/Provider';

export default function App({ Component, pageProps }: AppProps) {
  const cursorRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      gsap.to(cursorRef.current, {
        x: mouseX,
        y: mouseY,
        opacity: 1,
        delay: 0,
      });
    });

    const hideCursor = () => {
      gsap.to(cursorRef.current, { opacity: 0 });
    };

    const showCursor = () => {
      gsap.to(cursorRef.current, { opacity: 1 });
    };

    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mousedown', hideCursor);
    document.addEventListener('mouseup', showCursor);
  }, []);
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
        <a
          rel="me"
          href="https://mastodon.social/@alvinjoy"
          className="sr-only"
        >
          Mastodon
        </a>
        {/* Add more meta tags as needed */}

        {/* Favicon (example assuming you have a favicon.ico file in public directory) */}
        <link
          rel="shortcut icon"
          href="/assets/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
      </Head>
      <div
        ref={cursorRef}
        className="hidden lg:block w-3 h-3 opacity-0 pointer-events-none rounded-full bg-cursor-blue z-[9999] fixed -translate-x-1/2 -translate-y-1/2"
      />
      <GAnalytics />
      <Provider>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
