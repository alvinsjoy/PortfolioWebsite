import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Human",
          "Discord Bot Dev",
          "Freelancer",
          "JavaScript Dev",
          "CSE Undergrad",
          "Frontend Dev",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;