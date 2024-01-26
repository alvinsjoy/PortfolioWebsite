import React from "react";
import Typewriter from "typewriter-effect";

export default function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Human",
          "CSE Undergrad",
          "Discord Bot Dev",
          "JavaScript Dev",
          "App Dev",
          "Open Source Contributor",
          "Freelancer"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}
