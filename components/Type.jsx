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
          "Freelancer",
          "JavaScript Dev",
          "CSE Undergrad",
          "App Dev",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}
