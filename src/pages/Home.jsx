import { EASING, TRANSITION_TIME } from "../utils/constants";

import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import InfoSection from "../components/Sections/InfoSection";
import RsvpModal from "../components/RsvpModal";
import { useMemo, useState } from "react";

function hasUrlToken() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(new URLSearchParams(window.location.search).get("token")?.trim());
}

export default function Home() {
  const hasToken = useMemo(() => hasUrlToken(), []);
  const [opened, setOpened] = useState(!hasToken);

  return (
    <div className="relative">
      {!opened && hasToken && <EnvelopeIntro onFinish={() => setOpened(true)} />}
      <RsvpModal />

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
          <CeremonySection />
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
