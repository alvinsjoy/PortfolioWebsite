"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsSun, BsMoon } from "react-icons/bs";
import { IoIosDesktop } from "react-icons/io";
import { motion } from "framer-motion";

export default function Theme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  function handleClick() {
    if (theme === 'system') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('system');
    }
  }

  return (
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        {theme === 'system' && <IoIosDesktop />}
        {theme === 'dark' && <BsMoon />}
        {theme === 'light' && <BsSun />}
      </motion.button>
  )
};