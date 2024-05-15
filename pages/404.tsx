import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Theme from "@/components/ThemeSwitcher";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeoutId = setTimeout(() => {
      setAnimationFinished(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      key="1"
      className={`bg-gradient-to-r from-[#3f203d] via-black to-[#2f2010] text-white min-h-screen flex flex-col justify-center items-center ${
        isVisible || !animationFinished ? "visible" : "hidden"
      }`}
    >
      <div className="absolute top-4 right-4">
        <Theme />
      </div>
      <h1 className="text-6xl font-bold mb-2 gradient-text text-transparent bg-clip-text text-center">
        404 | Page Not Found
      </h1>
      <div className="mb-8 text-center max-w-lg text-[#AEB2B6]">
        <Link href="/">
          <Button variant="outline"><FaHome color="#AEB2B6" />&nbsp;Go Home</Button>
        </Link>
      </div>
      <footer className="w-full text-center p-4 fixed bottom-0">
        <p>
          <span className="font-aquire bg-gradient-to-r from-gray-500 via-gray-600 to-white text-transparent bg-clip-text">
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