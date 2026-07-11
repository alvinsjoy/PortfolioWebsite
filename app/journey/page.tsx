import type { Metadata } from 'next';
import {
  LuArrowUpRight,
  LuBriefcase,
  LuCircleDot,
  LuGitPullRequestArrow,
  LuGraduationCap,
} from 'react-icons/lu';
import BlurFade from '@/components/blur-fade';
import SectionHeading from '@/components/section-heading';
import SpotlightCard from '@/components/spotlight-card';
import Timeline from '@/components/timeline';
import { education, work } from '@/data/journey';
import { contributions } from '@/data/oss';
import profile from '@/data/profile.json';

export const metadata: Metadata = {
  title: 'Journey',
  description:
    'Where I have worked and studied, plus my open source contributions. The journey of Alvin Joy.',
};

export default function JourneyPage() {
  return (
    <div className="container pb-14">
      <BlurFade>
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              Where I&apos;ve{' '}
              <em className="font-serif font-normal text-primary">been</em>
            </>
          }
          description="Work, education and the open source trail that shaped how I build."
        />
      </BlurFade>

      <section className="mt-14">
        <BlurFade>
          <h2 className="mb-8 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card">
              <LuBriefcase className="size-4 text-primary" />
            </span>
            Experience
          </h2>
        </BlurFade>
        <Timeline entries={work} />
      </section>

      <section className="mt-16">
        <BlurFade>
          <h2 className="mb-8 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card">
              <LuGraduationCap className="size-4 text-primary" />
            </span>
            Education
          </h2>
        </BlurFade>
        <Timeline entries={education} />
      </section>

      <section className="mt-16">
        <BlurFade>
          <h2 className="mb-2 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card">
              <LuGitPullRequestArrow className="size-4 text-primary" />
            </span>
            Open Source
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
            Notable issues and pull requests in projects I use and care about.
          </p>
        </BlurFade>
        <div className="grid gap-3 sm:grid-cols-2">
          {contributions.map((contribution, i) => (
            <BlurFade
              key={contribution.url}
              delay={Math.min(i * 0.04, 0.3)}
              className="h-full"
            >
              <SpotlightCard className="h-full rounded-xl">
                <a
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex h-full items-start gap-3 p-4"
                >
                  {contribution.type === 'pr' ? (
                    <LuGitPullRequestArrow
                      title="Pull request"
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                  ) : (
                    <LuCircleDot
                      title="Issue"
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                  )}
                  <span className="flex-1">
                    <span className="block font-mono text-xs text-muted-foreground">
                      {contribution.repo}
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-snug">
                      {contribution.title}
                    </span>
                  </span>
                  <LuArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-foreground" />
                </a>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </section>

      <BlurFade delay={0.1}>
        <p className="mt-16 text-sm text-muted-foreground">
          The longer version lives on{' '}
          <a
            href={profile.contacts.linkedin.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-foreground hover:text-primary"
          >
            LinkedIn
            <LuArrowUpRight className="size-3.5" />
          </a>
          .
        </p>
      </BlurFade>
    </div>
  );
}
