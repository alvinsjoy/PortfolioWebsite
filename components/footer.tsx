'use client';

export default function Footer() {
  return (
    <footer className="w-full text-center p-4 fixed bottom-0">
      <p>
        <span className="font-aquire bg-linear-to-r from-gray-500 via-gray-400 to-black dark:from-gray-500 dark:via-gray-600 dark:to-white text-transparent bg-clip-text">
          Copyright ©️ {new Date().getFullYear()} Alvin Joy
        </span>
      </p>
    </footer>
  );
}
