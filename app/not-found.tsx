'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Footer from '@/components/footer';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timeoutId = setTimeout(() => {
      setAnimationFinished(true);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`bg-gradient-to-r from-[#d066c9] via-gray-200 to-[#bf8343] text-black dark:from-[#3f203d] dark:via-black dark:to-[#2f2010] dark:text-white min-h-screen flex flex-col justify-center items-center ${
        isVisible || !animationFinished ? 'visible' : 'hidden'
      }`}
    >
      <h1 className="gradient-text text-transparent bg-clip-text text-center">
        404 | Page Not Found
      </h1>
      <Link href="/">
        <Button
          variant="outline"
          className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
        >
          <FaHome />
          &nbsp;Go Home
        </Button>
      </Link>
      <Footer />
    </div>
  );
}
