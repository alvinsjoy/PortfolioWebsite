import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Human",
          "Software Developer",
          "Freelancer",
          "JavaScript Developer",
          "CSE Undergrad",
          "Frontend",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
