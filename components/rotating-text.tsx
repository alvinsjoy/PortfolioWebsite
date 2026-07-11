'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2600,
    );
    return () => clearInterval(id);
  }, [words.length]);

  return (
    // extra bottom padding keeps descenders (g, y, p) inside the clip region
    <span className="relative -mb-[0.18em] inline-grid overflow-y-clip pb-[0.18em] align-bottom">
      {/* widest word reserves the space so layout never shifts */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 text-primary"
          initial={{ y: '115%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-115%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
