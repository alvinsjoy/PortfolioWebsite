import type { Metadata } from 'next';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import { LuArrowRight, LuArrowUpRight, LuBuilding2 } from 'react-icons/lu';
import BlurFade from '@/components/blur-fade';
import LiveClock from '@/components/live-clock';
import SectionHeading from '@/components/section-heading';
import SpotlightCard from '@/components/spotlight-card';
import { Button } from '@/components/ui/button';
import profile from '@/data/profile.json';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who I am, where I am, and what I care about. Alvin Joy, full-stack developer from Kerala, India.',
};

const interests = [
  'Realtime & interactive apps',
  'Open source',
  'Machine learning',
  'Dev communities',
  'New tech, always',
];

export default function AboutPage() {
  const age = new Date().getFullYear() - profile.birthYear;
  const about = profile.about.replace('{age}', String(age));

  return (
    <div className="container pb-14">
      <BlurFade>
        <SectionHeading
          eyebrow="About"
          title={
            <>
              A little more{' '}
              <em className="font-serif font-normal text-primary">about me</em>
            </>
          }
        />
      </BlurFade>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {/* bio, spans two columns */}
        <BlurFade delay={0.05} className="md:col-span-2">
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col p-7">
              <h3 className="text-lg font-semibold tracking-tight">
                Hi again, I&apos;m {profile.name}.
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {about}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                My path so far: Discord bots, then web apps, then full-stack
                platforms, and these days Flutter apps backed by Go services.
                The constant is that I like building things people actually
                touch.
              </p>
              <div className="mt-auto pt-5">
                <Button asChild variant="outline" size="sm">
                  <Link href="/journey">
                    See my journey
                    <LuArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </BlurFade>

        {/* location + live time */}
        <BlurFade delay={0.1}>
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Based in
              </p>
              <div className="flex flex-1 flex-col justify-center gap-4 py-6">
                <p className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                  </span>
                  {profile.location}
                </p>
                <LiveClock withDate />
              </div>
            </div>
          </SpotlightCard>
        </BlurFade>

        {/* now */}
        <BlurFade delay={0.15}>
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Now
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-border/70 bg-background">
                  <LuBuilding2 className="size-5 text-primary" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  <a
                    href={profile.work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary"
                  >
                    {profile.work.company}
                    <LuArrowUpRight className="size-4" />
                  </a>
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Working as a software engineer, building with Flutter and Go:
                mobile apps, backend services and everything between.
              </p>
            </div>
          </SpotlightCard>
        </BlurFade>

        {/* interests */}
        <BlurFade delay={0.2} className="md:col-span-2">
          <SpotlightCard className="h-full">
            <div className="p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Beyond the code
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border/70 bg-background px-3.5 py-1.5 text-sm text-muted-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Open source is where I learned most of what I know. I have
                merged pull requests in highlight.js, winget-cli, Zen Browser
                and more, all listed on the{' '}
                <Link
                  href="/journey"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  journey page
                </Link>
                .
              </p>
            </div>
          </SpotlightCard>
        </BlurFade>

        {/* github */}
        <BlurFade delay={0.25} className="md:col-span-3">
          <SpotlightCard className="h-full">
            <a
              href={profile.contacts.github.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap items-center justify-between gap-4 p-7"
            >
              <div className="flex items-center gap-4">
                <FaGithub className="size-9" />
                <div>
                  <p className="text-lg font-semibold tracking-tight">
                    @{profile.contacts.github.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Most of my life, in commits
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                Visit GitHub
                <LuArrowUpRight className="size-4" />
              </span>
            </a>
          </SpotlightCard>
        </BlurFade>
      </div>
    </div>
  );
}
