import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GAnalytics from "@/components/GAnalytics";
import { Analytics } from "@vercel/analytics/react";
import gsap from "gsap";

export default function App({ Component, pageProps }: AppProps) {
  const cursorRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("mousemove", (e) => {
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

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mousedown", hideCursor);
    document.addEventListener("mouseup", showCursor);
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
        <meta name="keywords" content="portfolio, alvin joy, skill, javascript, alvin, profile" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Alvin Joy" />

        <meta name="twitter:title" content="Preview" />
        <meta name="twitter:description" content="Portfolio website preview." />
        <meta name="twitter:image" content="/assets/Website.png" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add more meta tags as needed */}

        {/* Favicon (example assuming you have a favicon.ico file in public directory) */}
        <link rel="shortcut icon" href="/icon.ico" type="image/x-icon" />
        <link rel="icon" href="/assets/icon.ico" type="image/x-icon" />
      </Head>
      <div
        ref={cursorRef}
        className="hidden lg:block w-12 h-12 opacity-0 pointer-events-none rounded-full border-2 border-marrsgreen dark:border-carrigreen z-[9999] fixed -translate-x-1/2 -translate-y-1/2"
      />
      <GAnalytics />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
