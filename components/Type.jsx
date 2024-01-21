import React from "react";
import Typewriter from "typewriter-effect";

export default Type;
function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Human",
          "Discord Bot Dev",
          "JavaScript Dev",
          "App Dev",
          "Freelancer",
          "CSE Undergrad",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}
