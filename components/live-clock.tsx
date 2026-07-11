'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

function Digit({ char }: { char: string }) {
  return (
    <span className="relative inline-grid h-[1.15em] w-[0.66em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          className="col-start-1 row-start-1 flex items-center justify-center"
          initial={{ y: '100%', opacity: 0, filter: 'blur(3px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(3px)' }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.55 }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function LiveClock({ withDate = false }: { withDate?: boolean }) {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const update = () => {
      const now = new Date();
      setTime(timeFormatter.format(now));
      setDate(dateFormatter.format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex flex-col gap-2">
      {withDate && (
        <span className="text-sm text-muted-foreground">
          {date ?? ' '}
        </span>
      )}
      <span className="inline-flex items-baseline gap-2">
      <span className="font-mono text-3xl font-medium tabular-nums leading-none">
        {time === null ? (
          <span className="opacity-40">--:--:--</span>
        ) : (
          time
            .split('')
            .map((char, i) =>
              char === ':' ? (
                <span
                  key={`sep-${i}`}
                  className="mx-px inline-block animate-pulse text-muted-foreground"
                >
                  :
                </span>
              ) : (
                <Digit key={`d-${i}`} char={char} />
              ),
            )
        )}
      </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          IST
        </span>
      </span>
    </span>
  );
}
