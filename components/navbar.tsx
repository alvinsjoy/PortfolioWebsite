'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { LuArrowUpRight } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import LiquidGlass from '@/components/liquid-glass';
import ThemeSwitcher from '@/components/theme-switcher';
import { cn } from '@/lib/utils';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Journey', href: '/journey' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Main">
        <LiquidGlass className="flex items-center gap-1 py-1.5 pl-2 pr-1.5">
          <Link
            href="/"
            aria-label="Alvin Joy, home"
            className="mr-1 transition-transform hover:scale-105 active:scale-95"
          >
            <Avatar className="size-8 ring-1 ring-border">
              <AvatarImage
                src="https://github.com/alvinsjoy.png"
                alt="Alvin Joy"
              />
              <AvatarFallback className="text-xs">AJ</AvatarFallback>
            </Avatar>
          </Link>

          <ul className="flex items-center">
            {links.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300',
                      active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-foreground/8 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.25)] dark:bg-foreground/10"
                        transition={{
                          type: 'spring',
                          bounce: 0.22,
                          duration: 0.55,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
            <li className="max-sm:hidden">
              <a
                href="https://aj.is-a.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-0.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Links
                <LuArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </li>
          </ul>

          <Separator orientation="vertical" className="mx-1 h-5 bg-border" />
          <ThemeSwitcher />
        </LiquidGlass>
      </nav>
    </header>
  );
}
