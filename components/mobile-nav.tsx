'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
  LuArrowRight,
  LuArrowUpRight,
  LuHouse,
  LuMapPin,
  LuRoute,
  LuUserRound,
  LuX,
} from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import LiveClock from '@/components/live-clock';
import SocialLinks from '@/components/social-links';
import profile from '@/data/profile.json';
import { cn } from '@/lib/utils';

const routes: { label: string; href: string; icon: IconType }[] = [
  { label: 'Home', href: '/', icon: LuHouse },
  { label: 'About', href: '/about', icon: LuUserRound },
  { label: 'Journey', href: '/journey', icon: LuRoute },
];

/* Opens the drawer. Lives inside the navbar pill, and only below md
   where the inline links are hidden. */
export function MobileNavTrigger() {
  const { setOpenMobile, openMobile } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Open menu"
      aria-expanded={openMobile}
      onClick={() => setOpenMobile(true)}
      className="relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[''] hover:text-foreground md:hidden"
    >
      {/* drawn rules rather than a glyph, so it matches the icon set */}
      <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
        <span className="h-[1.5px] w-full rounded-full bg-current" />
        <span className="h-[1.5px] w-full rounded-full bg-current" />
        <span className="h-[1.5px] w-3/4 rounded-full bg-current" />
      </span>
    </button>
  );
}

export function MobileNavDrawer() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);

  return (
    /* the desktop branch of <Sidebar> is `hidden md:block`, so this wrapper
       keeps it out of the layout above md. The mobile Sheet portals out of
       here, so the drawer itself is unaffected. */
    <div className="md:hidden">
      <Sidebar side="left" collapsible="offcanvas">
        <SidebarHeader className="gap-4 border-b border-sidebar-border p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-11 ring-1 ring-border">
                <AvatarImage
                  src="https://github.com/alvinsjoy.png"
                  alt={profile.name}
                />
                <AvatarFallback className="text-xs">AJ</AvatarFallback>
              </Avatar>
              <span className="flex flex-col">
                <span className="font-wordmark text-base font-semibold tracking-wide">
                  {profile.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {profile.roles[0]}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="relative -mr-1 -mt-1 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors before:absolute before:-inset-1.5 before:content-[''] hover:bg-accent hover:text-foreground"
            >
              <LuX className="size-4" />
            </button>
          </div>

          {/* the same live signal the hero carries */}
          <a
            href={profile.work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="whitespace-nowrap">
              Building things at{' '}
              <span className="font-semibold text-foreground">
                {profile.work.company}
              </span>
            </span>
          </a>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </SidebarGroupLabel>
            <SidebarMenu className="mt-1 gap-1">
              {routes.map(({ label, href, icon: Icon }) => {
                const active =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      isActive={active}
                      className={cn(
                        'rounded-xl px-3 text-base',
                        active && 'font-semibold',
                      )}
                    >
                      <Link href={href} onClick={close}>
                        <Icon
                          className={cn(
                            'size-4',
                            active ? 'text-primary' : 'text-muted-foreground',
                          )}
                        />
                        <span>{label}</span>
                        {active && (
                          <span
                            aria-hidden="true"
                            className="ml-auto size-1.5 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-2">
            <SidebarGroupLabel className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </SidebarGroupLabel>
            <SidebarMenu className="mt-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className="rounded-xl px-3 text-base"
                >
                  <a
                    href="https://aj.is-a.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                  >
                    <LuArrowUpRight className="size-4 text-muted-foreground" />
                    <span>Links</span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground">
                      aj.is-a.dev
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {/* the drawer ends on the same action the home page ends on, which
              also anchors the slack a four-item menu leaves on a tall phone */}
          <div className="mt-auto px-1 pt-6">
            <Button asChild variant="primary" size="lg" className="w-full">
              <a href={profile.contacts.email.link} onClick={close}>
                Say hello
                <LuArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </SidebarContent>

        <SidebarFooter className="gap-3 border-t border-sidebar-border p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <LuMapPin className="size-3.5 shrink-0 text-primary" />
              {profile.location}
            </span>
            <LiveClock compact />
          </div>
          <SocialLinks compact />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
