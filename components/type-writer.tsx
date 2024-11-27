'use client';

import Typewriter from 'typewriter-effect';

export function TypeWriter() {
  return (
    <Typewriter
      options={{
        strings: [
          'Human',
          'CSE Undergrad',
          'Discord Bot Dev',
          'JavaScript Dev',
          'App Dev',
          'Open Source Contributor',
          'Freelancer',
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}