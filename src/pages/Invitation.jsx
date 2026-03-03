import { EASING, TRANSITION_TIME } from "../utils/constants";
import { useMemo, useState } from "react";

import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import InfoSection from "../components/Sections/InfoSection";
import RsvpModal from "../components/RsvpModal";
import { useParams } from "react-router-dom";

export default function Invitation() {
  const { token } = useParams();

  const hasToken = useMemo(() => Boolean(token?.trim()), [token]);
  const [opened, setOpened] = useState(!hasToken);

  return (
    <div className="relative">
      {!opened && hasToken && (
        <EnvelopeIntro onFinish={() => setOpened(true)} />
      )}
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
