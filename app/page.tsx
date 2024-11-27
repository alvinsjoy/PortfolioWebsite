'use client';

import { useEffect, useState } from 'react';
import { SocialLinks } from '@/components/social-links';
import { TypeWriter } from '@/components/type-writer';
import { Footer } from '@/components/footer';
import jsonData from '@/data/profile.json';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timeoutId = setTimeout(() => {
      setAnimationFinished(true);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const { name, bio } = jsonData;

  return (
    <div
      className={`bg-gradient-to-r from-[#c761c0] via-gray-200 to-[#b77d40] text-black dark:from-[#3f203d] dark:via-black dark:to-[#2f2010] dark:text-white min-h-screen flex flex-col justify-center items-center ${
        isVisible || !animationFinished ? 'visible' : 'hidden'
      }`}
    >
      <h1 className="gradient-text text-transparent bg-clip-text text-center">
        {name}
      </h1>
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 dark:from-gray-100 dark:via-gray-400 dark:to-gray-700 text-transparent bg-clip-text text-center">
        <TypeWriter />
      </h2>
      <hr className="border-gray-900 dark:border-gray-600 w-full max-w-lg mb-8" />
      <p className="mb-8 text-center max-w-lg max-sm:px-2 text-[#111111] dark:text-[#AEB2B6]">
        {bio}
      </p>
      <hr className="border-gray-900 dark:border-gray-600 w-full max-w-lg mb-8" />
      <SocialLinks />
      <Footer />
    </div>
  );
}