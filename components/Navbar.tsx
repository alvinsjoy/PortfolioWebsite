import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import jsonData from '../public/data.json';
import Theme from '@/components/ThemeSwitcher';

const {
  contacts: { github },
} = jsonData;
export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[90%] max-w-[1200px] -translate-x-1/2 rounded-3xl backdrop-blur-md bg-gray-200/60 dark:bg-gray-950/60 shadow-lg">
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
        <nav className="flex items-center space-x-4">
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:text-gray-800 dark:hover:text-gray-200 hover:underline"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:text-gray-800 dark:hover:text-gray-200 hover:underline"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:text-gray-800 dark:hover:text-gray-200 hover:underline"
            href={github.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
          <Theme />
        </nav>
      </div>
    </header>
  );
}
