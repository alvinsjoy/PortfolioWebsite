'use client';

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import ThemeSwitcher from '@/components/theme-switcher';
import { Separator } from '@/components/ui/separator';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#' },
    { label: 'Links', href: 'https://aj.is-a.dev', external: true },
  ];

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const homeElement = tabRefs.current[0];
      if (homeElement) {
        const { offsetLeft, offsetWidth } = homeElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[90%] max-w-[1200px] -translate-x-1/2 rounded-3xl backdrop-blur-xs bg-gray-200/60 dark:bg-gray-950/60 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarImage
              src="https://github.com/alvinsjoy.png"
              alt="alvinjoy"
            />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </Link>
        <nav className="flex items-center gap-4">
          <div className="relative">
            {/* Hover Highlight */}
            <div
              className="absolute h-[30px] transition-all duration-300 ease-out bg-gray-100 dark:bg-gray-800 rounded-[6px] flex items-center"
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className="absolute bottom-[-6px] h-[2px] bg-secondary-foreground dark:bg-secondary-foreground transition-all duration-300 ease-out"
              style={activeStyle}
            />

            {/* Navigation Links */}
            <div className="relative flex space-x-[6px] items-center">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  className="px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px]"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(index)}
                >
                  <Link
                    className={`text-sm font-medium whitespace-nowrap flex items-center justify-center h-full ${
                      index === activeIndex || index === hoveredIndex
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                    href={link.href}
                    {...(link.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Separator className="h-5 w-px bg-muted-foreground" />
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
