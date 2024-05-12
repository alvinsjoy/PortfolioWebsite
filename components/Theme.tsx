import { useTheme } from 'next-themes'
import { BsSun, BsMoon, BsLaptop } from 'react-icons/bs'
import { motion } from 'framer-motion'

export default function Theme() {
  const { theme, setTheme } = useTheme()

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
        {theme === 'system' && <BsLaptop />}
        {theme === 'dark' && <BsMoon />}
        {theme === 'light' && <BsSun />}
      </motion.button>
  )
};