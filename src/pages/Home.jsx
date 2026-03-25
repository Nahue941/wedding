import { EASING, TRANSITION_TIME } from "../utils/constants";
import { useEffect, useRef, useState } from "react";

import AudioToggleButton from "../components/AudioToggleButton";
import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Footer from "../components/Sections/Footer";
import Hero from "../components/Hero/Hero";
import InfoSection from "../components/Sections/InfoSection";
import RsvpModal from "../components/RsvpModal";
import { startLoopedAudio } from "../utils/audio";

const INVITATION_TOKEN_KEY = "invitation_token";

export default function Home() {
  const initialToken =
    typeof window === "undefined"
      ? ""
      : String(localStorage.getItem(INVITATION_TOKEN_KEY) || "").trim();

  const [normalizedToken, setNormalizedToken] = useState(initialToken);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [invitationName, setInvitationName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      audio.volume = 0.3;
      const playPromise = audio.play();
      if (typeof window !== "undefined") {
        window.localStorage.setItem("audio_muted", "0");
      }
      setIsAudioMuted(false);
      if (playPromise?.then) {
        playPromise.then(() => setIsAudioPlaying(true)).catch(() => {});
      } else {
        setIsAudioPlaying(true);
      }
      return;
    }
    audio.pause();
    if (typeof window !== "undefined") {
      window.localStorage.setItem("audio_muted", "1");
    }
    setIsAudioMuted(true);
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    let cancelled = false;

    async function validateToken() {
      if (!initialToken) {
        if (!cancelled) {
          setIsValidating(false);
          setIsTokenValid(true);
          setOpened(true);
          setInvitationName("");
          setGuestCount(1);
          setAlreadySubmitted(false);
        }
        return;
      }

      if (!cancelled) {
        setIsValidating(true);
        setIsTokenValid(false);
        setOpened(false);
      }

      try {
        const response = await fetch(
          `/api/invitation?token=${encodeURIComponent(initialToken)}`,
        );
        const data = await response.json();

        if (!response.ok) {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(INVITATION_TOKEN_KEY);
          }
          if (!cancelled) {
            setNormalizedToken("");
            setIsTokenValid(true);
            setOpened(true);
            setInvitationName("");
            setGuestCount(1);
            setAlreadySubmitted(false);
          }
          return;
        }

        if (!cancelled) {
          setInvitationName(data.invitation?.name?.trim?.() ?? "");
          const parsedGuestCount = Number(data.invitation?.guestCount);
          setGuestCount(parsedGuestCount > 1 ? parsedGuestCount : 1);
          setAlreadySubmitted(Boolean(data.alreadySubmitted));
          setNormalizedToken(initialToken);
          setIsTokenValid(true);
        }
      } catch {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(INVITATION_TOKEN_KEY);
        }
        if (!cancelled) {
          setNormalizedToken("");
          setIsTokenValid(true);
          setOpened(true);
          setInvitationName("");
          setGuestCount(1);
          setAlreadySubmitted(false);
        }
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
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem("audio_muted");
    if (stored === "1") {
      setIsAudioMuted(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const body = document.body;
    if (!opened) {
      const previousOverflow = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = previousOverflow;
      };
    }
    body.style.overflow = "";
  }, [opened]);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof history !== "undefined") {
      history.scrollRestoration = "manual";
    }
  }, []);

  if (isValidating || !isTokenValid) {
    return null;
  }

  return (
    <div className="relative">
      <audio ref={audioRef} src="/audio/para-siempre.mp3" preload="auto" />
      {opened && (
        <AudioToggleButton isPlaying={isAudioPlaying} onToggle={toggleAudio} />
      )}
      {opened && (
        <RsvpModal
          token={normalizedToken}
          name={invitationName}
          guestCount={guestCount}
          initialAlreadySubmitted={alreadySubmitted}
        />
      )}
      <div>
        {!opened && (
          <EnvelopeIntro
            onFinish={() => setOpened(true)}
              onOpen={() => {
                if (isAudioMuted) {
                  return;
                }
                startLoopedAudio(audioRef, setIsAudioPlaying, 0.3);
              }}
          />
        )}
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
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}



