import React from "react";
import Typewriter from "typewriter-effect";

export default Type;
function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Human",
          "CSE Undergrad",
          "Discord Bot Dev",
          "JavaScript Dev",
          "App Dev",
          "Freelancer",
          "Open Source Contributor",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}
