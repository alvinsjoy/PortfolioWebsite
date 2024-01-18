// _app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Title */}
        <title>Profile | Alvin Joy</title>

        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="I'm Alvin Joy, a JavaScript developer with a love for creating interactive applications. I've worked on Discord bots using discord.js and am now expanding my skills into Flutter and web development. I'm always eager to learn and improve, and I'm excited about the future of technology. Outside of coding, I enjoy exploring new tech and staying connected with the developer community." />
        {/* Add more meta tags as needed */}

        {/* Favicon (example assuming you have a favicon.ico file in public directory) */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
