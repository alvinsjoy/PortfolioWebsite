import { useEffect, useState } from 'react';
import Link from 'next/link';
import jsonData from '../data.json';
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import Type from "../components/Type.jsx";
//import CustomCursor from '../components/Cursor'

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
    contacts: { github, email, twitter, instagram, linkedin },
    footer: { madeByText, author, fontClass },
  } = jsonData;

  return (
    <div
      key="1"
      className={`bg-gradient-to-r from-[#202F3F] via-black to-[#102F2F] text-white min-h-screen flex flex-col justify-center items-center ${
        isVisible || !animationFinished ? 'visible' : 'hidden'
      }`}
    >
      <h1 className="text-6xl font-bold mb-2 gradient-text text-transparent bg-clip-text text-center">
        {name}
      </h1>
      <h2 className="text-4xl font-light mb-4 bg-gradient-to-r from-white via-gray-500 to-gray-900 text-transparent bg-clip-text">
      <Type />
      </h2>
      <hr className="border-gray-700 w-full max-w-lg mb-8" />
      <p className="mb-8 text-center max-w-lg text-[#AEB2B6]">{bio}</p>
      <hr className="border-gray-700 w-full max-w-lg mb-8" />
      <ul className="list-none space-y-2 text-center flex justify-center space-x-4 items-center">
        <li>
          <Link href={github.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaGithub size={24} color="#fff" />
          </Link>
        </li>

        <li>
          <Link href={email.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <MdOutlineEmail size={24} color="#fff" />
          </Link>
        </li>
        <li>
          <Link href={twitter.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaTwitter size={24} color="#fff" />
          </Link>
        </li>
        <li>
          <Link href={instagram.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaInstagram size={24} color="#fff" />
          </Link>
        </li>
        <li>
          <Link href={linkedin.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaLinkedin size={24} color="#fff" />
          </Link>
        </li>
      </ul>

      <footer className="w-full text-center p-4 fixed bottom-0">
        <p className="text-[#AEB2B6] bg-gradient-to-r from-gray-500 via-gray-600 to-white text-transparent bg-clip-text">
          <span className="text-sm">{madeByText}</span>
          <br />
          <span className={`${fontClass} bg-gradient-to-r from-gray-500 via-gray-600 to-white text-transparent bg-clip-text`}>
            {author}
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
