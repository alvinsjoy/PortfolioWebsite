import Link from 'next/link';
import SocialLinks from '@/components/social-links';
import { FaHeart } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="container flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link href="/" className="font-aquire text-lg tracking-wide">
            Alvin Joy
          </Link>
          <p className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
            © {new Date().getFullYear()} · Built with
            <FaHeart
              aria-label="love"
              className="size-3.5 text-primary"
            />
            and Next.js
          </p>
        </div>
        <SocialLinks compact />
      </div>
    </footer>
  );
}
