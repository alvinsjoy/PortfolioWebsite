import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import { LuArrowRight, LuMapPin } from 'react-icons/lu';
import BlurFade from '@/components/blur-fade';
import DitherBackground from '@/components/dither-background';
import Marquee from '@/components/marquee';
import ProjectCard from '@/components/project-card';
import RotatingText from '@/components/rotating-text';
import SectionHeading from '@/components/section-heading';
import SocialLinks from '@/components/social-links';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import profile from '@/data/profile.json';

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const half = Math.ceil(skills.length / 2);

  return (
    <div className="container relative">
      {/* React Bits Dither waves behind the hero, tracking the pointer */}
      <DitherBackground className="absolute -top-32 left-1/2 -z-10 h-155 w-screen -translate-x-1/2" />

      {/* ---------- hero ---------- */}
      <section className="flex items-center justify-between gap-16 py-14 sm:py-20">
        <div className="min-w-0 max-w-2xl">
          <BlurFade>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Building things at{' '}
                <a
                  href={profile.work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary"
                >
                  {profile.work.company}
                </a>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <LuMapPin className="size-3.5" />
                {profile.location}
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.05}>
            <h1 className="mt-6 text-5xl font-semibold tracking-tighter sm:text-7xl">
              Hey, I&apos;m <span className="text-gradient">Alvin Joy</span>
              <span className="text-primary">.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p className="mt-5 text-2xl font-medium tracking-tight text-muted-foreground sm:text-3xl">
              <span className="block">
                <RotatingText words={profile.roles} />
              </span>
              <span className="block">
                crafting{' '}
                <em className="font-serif text-[1.1em] text-foreground">
                  interactive
                </em>{' '}
                experiences, end to end.
              </span>
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/about">
                  More about me
                  <LuArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={profile.contacts.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="size-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.25}>
            <div className="mt-8">
              <SocialLinks />
            </div>
          </BlurFade>
        </div>

        {/* portrait, only on wide screens where the hero would feel empty */}
        <BlurFade delay={0.15} className="hidden shrink-0 lg:block">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="group relative rotate-3 rounded-3xl border border-border/70 bg-card p-2.5 shadow-xl transition-transform duration-500 ease-out hover:rotate-0">
              <Image
                src="https://avatars.githubusercontent.com/alvinsjoy"
                alt="Alvin Joy"
                width={280}
                height={280}
                priority
                className="rounded-2xl"
              />
              <a
                href={profile.contacts.github.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-xs font-medium shadow-md transition-colors hover:text-primary"
              >
                <FaGithub className="size-3.5" />@
                {profile.contacts.github.username}
              </a>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ---------- projects ---------- */}
      <section className="py-14">
        <BlurFade>
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Stuff I&apos;ve{' '}
                <em className="font-serif font-normal text-primary">built</em>
              </>
            }
            description="Projects I'm proud of: retrieval-augmented generation, computer vision for Indian roads, realtime apps and tools I actually use."
          />
        </BlurFade>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <BlurFade key={project.name} delay={0.08 * i} className="h-full">
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ---------- skills ---------- */}
      <section className="py-14">
        <BlurFade>
          <SectionHeading
            eyebrow="Toolbox"
            title={
              <>
                What I{' '}
                <em className="font-serif font-normal text-primary">
                  work with
                </em>
              </>
            }
          />
        </BlurFade>
        <BlurFade delay={0.15}>
          <div className="mt-10 flex flex-col gap-3">
            <Marquee duration="55s">
              {skills.slice(0, half).map(({ icon: Icon, name }) => (
                <span
                  key={name}
                  className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 text-primary" />
                  {name}
                </span>
              ))}
            </Marquee>
            <Marquee reverse duration="55s">
              {skills.slice(half).map(({ icon: Icon, name }) => (
                <span
                  key={name}
                  className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 text-primary" />
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        </BlurFade>
      </section>

      {/* ---------- cta ---------- */}
      <section className="py-14">
        <BlurFade>
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card px-8 py-14 text-center sm:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 80% at 50% 120%, hsl(var(--glow) / 0.14), transparent 70%)',
              }}
            />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Have an idea?{' '}
              <em className="font-serif font-normal">
                Let&apos;s build it together.
              </em>
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
              I&apos;m open to collaborations, interesting problems and good
              conversations.
            </p>
            <div className="relative mt-8">
              <Button asChild variant="primary" size="lg">
                <a href={profile.contacts.email.link}>
                  Say hello
                  <LuArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
