'use client';

import Link from 'next/link';
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaGithub,
  FaRedditAlien,
  FaEnvelope,
} from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import jsonData from '@/data/profile.json';

const {
  contacts: { github, email, twitter, instagram, reddit, linkedin },
} = jsonData;

export default function SocialLinks() {
  return (
    <ul className="text-center flex justify-center gap-4 items-center">
      <li>
        <Link href={github.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
          >
            <FaGithub
              className="w-8 h-8 sm:w-6 sm:h-6"
              title={`GitHub: ${github.username}`}
            />
          </Button>
        </Link>
      </li>
      <li>
        <Link href={email.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
          >
            <FaEnvelope
              className="w-8 h-8 sm:w-6 sm:h-6"
              title={`Email: ${email.username}`}
            />
          </Button>
        </Link>
      </li>
      <li>
        <Link href={twitter.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
          >
            <FaXTwitter
              className="w-8 h-8 sm:w-6 sm:h-6"
              title={`Twitter: ${twitter.username}`}
            />
          </Button>
        </Link>
      </li>
      <li>
        <Link href={instagram.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
          >
            <FaInstagram
              className="w-8 h-8 sm:w-6 sm:h-6"
              title={`Instagram: ${instagram.username}`}
            />
          </Button>
        </Link>
      </li>
      <li>
        <Link href={reddit.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
          >
            <FaRedditAlien
              className="w-8 h-8 sm:w-6 sm:h-6"
              title={`Reddit: ${reddit.username}`}
            />
          </Button>
        </Link>
      </li>
      <li>
        <Link href={linkedin.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111111] dark:text-[#AEB2B6] hover:text-foreground dark:hover:text-foreground"
          >
            <FaLinkedin
              title={`LinkedIn: ${linkedin.username}`}
              className="w-8 h-8 sm:w-6 sm:h-6"
            />
          </Button>
        </Link>
      </li>
    </ul>
  );
}
