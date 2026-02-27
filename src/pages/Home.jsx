import { EASING, TRANSITION_TIME } from "../utils/constants";

import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import { useState } from "react";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <EnvelopeIntro onFinish={() => setOpened(true)} />

      <div
        style={{
          transitionDuration: TRANSITION_TIME,
          transitionTimingFunction: EASING,
        }}
        className={`
          transition-all
          ${opened ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
      >
        <Hero opened={opened} />
      </div>
    </div>
  );
}
