'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { LuArrowUpRight } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider } from '@/components/ui/sidebar';
import LiquidGlass from '@/components/liquid-glass';
import ThemeSwitcher from '@/components/theme-switcher';
import { MobileNavDrawer, MobileNavTrigger } from '@/components/mobile-nav';
import profile from '@/data/profile.json';
import { cn } from '@/lib/utils';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Journey', href: '/journey' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    /* `contents` neutralises SidebarProvider's `flex min-h-svh w-full`
       app-shell wrapper, which would otherwise add a full-viewport block
       above <main>. Custom properties still inherit through it. */
    <SidebarProvider className="contents">
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:px-4">
        <nav aria-label="Main">
          <LiquidGlass className="flex items-center gap-1 py-1.5 pl-2 pr-1.5">
            <MobileNavTrigger />

            <Separator
              orientation="vertical"
              className="mx-0.5 h-5 bg-border md:hidden"
            />

            <Link
              href="/"
              aria-label="Alvin Joy, home"
              /* ::before stretches the tap target to the pill's full height
                 without changing the avatar's rendered size */
              className="relative flex items-center gap-2 transition-transform before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[''] hover:scale-105 active:scale-95 md:mr-1"
            >
              <Avatar className="size-8 ring-1 ring-border">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xs">AJ</AvatarFallback>
              </Avatar>
              {/* the name carries the pill below md, where the links are
                  in the drawer and the bar would otherwise read as empty */}
              <span className="font-wordmark text-sm font-semibold tracking-wide md:hidden">
                {profile.name}
              </span>
            </Link>

            <ul className="hidden items-center md:flex">
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
                        'relative block rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 sm:px-3.5',
                        // fills the pill's dead vertical padding so the tap
                        // target is 44px tall while the label stays 32px
                        "before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']",
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
              <li>
                <a
                  href={profile.contacts.links.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-0.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[''] hover:text-foreground sm:px-3.5"
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

      <MobileNavDrawer />
    </SidebarProvider>
  );
}
