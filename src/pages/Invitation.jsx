import { EASING, TRANSITION_TIME } from "../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import InfoSection from "../components/Sections/InfoSection";
import RsvpModal from "../components/RsvpModal";

export default function Invitation() {
  const { token } = useParams();
  const navigate = useNavigate();

  const normalizedToken = String(token ?? "").trim();
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [invitationName, setInvitationName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function validateToken() {
      if (!normalizedToken) {
        navigate("/la-boda", { replace: true });
        return;
      }

      setIsValidating(true);
      setIsTokenValid(false);
      setOpened(false);

      try {
        const response = await fetch(
          `/api/invitation?token=${encodeURIComponent(normalizedToken)}`,
        );
        const data = await response.json();

        if (!response.ok) {
          navigate("/la-boda", { replace: true });
          return;
        }

        if (!cancelled) {
          setInvitationName(data.invitation?.name?.trim?.() ?? "");
          const parsedGuestCount = Number(data.invitation?.guestCount);
          setGuestCount(parsedGuestCount > 1 ? parsedGuestCount : 1);
          setAlreadySubmitted(Boolean(data.alreadySubmitted));
          setIsTokenValid(true);
        }
      } catch {
        navigate("/la-boda", { replace: true });
      } finally {
        if (!cancelled) {
          setIsValidating(false);
        }
      }
    }

    validateToken();
    return () => {
      cancelled = true;
    };
  }, [navigate, normalizedToken]);

  if (isValidating || !isTokenValid) {
    return null;
  }

  return (
    <div className="relative">
      {!opened && <EnvelopeIntro onFinish={() => setOpened(true)} />}
      <RsvpModal
        token={normalizedToken}
        name={invitationName}
        guestCount={guestCount}
        initialAlreadySubmitted={alreadySubmitted}
      />

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
