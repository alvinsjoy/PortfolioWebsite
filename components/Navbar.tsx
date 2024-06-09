import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import jsonData from '../public/data.json';
import Theme from '@/components/ThemeSwitcher';
import { Separator } from '@/components/ui/separator';

const {
  contacts: { github },
} = jsonData;
export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[90%] max-w-[1200px] -translate-x-1/2 rounded-3xl backdrop-blur-sm bg-gray-200/60 dark:bg-gray-950/60 shadow-lg">
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
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-[#EE4B2B] dark:hover:text-[#FFEA00]"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-[#EE4B2B] dark:hover:text-[#FFEA00]"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-[#EE4B2B] dark:hover:text-[#FFEA00]"
            href={github.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
          <Separator className="h-5 w-px bg-muted-foreground" />
          <Theme />
        </nav>
      </div>
    </header>
  );
}
