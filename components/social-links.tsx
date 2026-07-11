'use client';

import type { IconType } from 'react-icons';
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaRedditAlien,
  FaXTwitter,
} from 'react-icons/fa6';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import jsonData from '@/data/profile.json';

const { contacts } = jsonData;

const items: { label: string; icon: IconType; link: string }[] = [
  { label: `GitHub · ${contacts.github.username}`, icon: FaGithub, link: contacts.github.link },
  { label: contacts.email.username, icon: FaEnvelope, link: contacts.email.link },
  { label: `Twitter · @${contacts.twitter.username}`, icon: FaXTwitter, link: contacts.twitter.link },
  { label: `LinkedIn · ${contacts.linkedin.username}`, icon: FaLinkedin, link: contacts.linkedin.link },
  { label: `Instagram · @${contacts.instagram.username}`, icon: FaInstagram, link: contacts.instagram.link },
  { label: `Reddit · u/${contacts.reddit.username}`, icon: FaRedditAlien, link: contacts.reddit.link },
];

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <TooltipProvider delayDuration={150}>
      <ul className={cn('flex items-center', compact ? 'gap-1' : 'gap-2')}>
        {items.map(({ label, icon: Icon, link }) => (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    'flex items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-foreground',
                    compact ? 'size-8' : 'size-10',
                  )}
                >
                  <Icon className={compact ? 'size-4' : 'size-5'} />
                </a>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
