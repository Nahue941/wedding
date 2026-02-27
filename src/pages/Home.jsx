import { EASING, TRANSITION_TIME } from "../utils/constants";

import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import { useState } from "react";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative relative scroll-smooth">
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
        <div className="snap-y snap-mandatory">
          <Hero opened={opened} />
          <DateSection />
        </div>
      </div>
    </div>
  );
}
