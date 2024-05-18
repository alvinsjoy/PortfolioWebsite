import { useEffect, useState } from 'react';
import Link from 'next/link';
import jsonData from '../public/data.json';
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaGithub,
  FaRedditAlien,
  FaEnvelope,
} from 'react-icons/fa6';
import Type from '@/components/Type';
import Theme from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { IconContext } from 'react-icons/lib';
import Navbar from '@/components/Navbar';
//import SkillList from "@/components/Skill";

export default function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeoutId = setTimeout(() => {
      setAnimationFinished(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const {
    name,
    bio,
    contacts: { github, email, twitter, instagram, reddit, linkedin },
  } = jsonData;

  return (
    <div
      key="1"
      className={`bg-gradient-to-r from-[#d066c9] via-gray-200 to-[#bf8343] text-black dark:from-[#3f203d] dark:via-black dark:to-[#2f2010] dark:text-white min-h-screen flex flex-col justify-center items-center ${
        isVisible || !animationFinished ? 'visible' : 'hidden'
      }`}
    >
      <Navbar />
      <h1 className="gradient-text text-transparent bg-clip-text text-center">
        {name}
      </h1>
      <h2 className="text-4xl font-light mb-4 bg-gradient-to-r from-gray-900 via-gray-500 to-gray-300 dark:from-gray-200 dark:via-gray-500 dark:to-gray-900 text-transparent bg-clip-text">
        <Type />
      </h2>
      <hr className="border-gray-900 dark:border-gray-700 w-full max-w-lg mb-8" />
      <p className="mb-8 text-center max-w-lg text-[#040404] dark:text-[#AEB2B6]">
        {bio}
      </p>
      <hr className="border-gray-900 dark:border-gray-700 w-full max-w-lg mb-8" />
      {/*<h4 className="text-4xl font-light mb-4 bg-gradient-to-r from-white via-gray-500 to-gray-900 text-transparent bg-clip-text">
        Skills
      </h4>
      <div className="max-w-lg">
        <SkillList />
      </div>*/}
      <ul className="list-none space-y-2 text-center flex justify-center space-x-4 items-center">
        <li>
          <Link href={github.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="relative top-1">
              <IconContext.Provider value={{ color: '#AEB2B6', size: '24px' }}>
                <FaGithub title={`GitHub: ${github.username}`} />
              </IconContext.Provider>
            </Button>
          </Link>
        </li>

        <li>
          <Link href={email.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <IconContext.Provider value={{ color: '#AEB2B6', size: '24px' }}>
                <FaEnvelope title={`Email: ${email.username}`} />
              </IconContext.Provider>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={twitter.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <IconContext.Provider value={{ color: '#AEB2B6', size: '24px' }}>
                <FaXTwitter title={`Twitter: ${twitter.username}`} />
              </IconContext.Provider>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={instagram.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <IconContext.Provider value={{ color: '#AEB2B6', size: '24px' }}>
                <FaInstagram title={`Instagram: ${instagram.username}`} />
              </IconContext.Provider>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={reddit.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <IconContext.Provider value={{ color: '#AEB2B6', size: '24px' }}>
                <FaRedditAlien title={`Reddit: ${reddit.username}`} />
              </IconContext.Provider>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={linkedin.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <IconContext.Provider value={{ color: '#AEB2B6', size: '24px' }}>
                <FaLinkedin title={`LinkedIn: ${linkedin.username}`} />
              </IconContext.Provider>
            </Button>
          </Link>
        </li>
      </ul>

      <footer className="w-full text-center p-4 fixed bottom-0">
        <p>
          <span className="font-aquire bg-gradient-to-r from-gray-600 via-gray-800 to-black dark:from-gray-500 dark:via-gray-600 dark:to-white text-transparent bg-clip-text">
            Copyright ©️ {new Date().getFullYear()} Alvin Joy
          </span>
        </p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .visible {
          animation: fadeIn 1s ease-in-out;
          opacity: 1;
        }

        .hidden {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
