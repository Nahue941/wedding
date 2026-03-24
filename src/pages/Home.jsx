import { EASING, TRANSITION_TIME } from "../utils/constants";
import AudioToggleButton from "../components/AudioToggleButton";
import { useEffect, useRef, useState } from "react";
import { startLoopedAudio } from "../utils/audio";

import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import HomeStyles from "./Home.module.css";
import InfoSection from "../components/Sections/InfoSection";
import RsvpModal from "../components/RsvpModal";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryPolaroids from "../components/StoryPolaroids";
import gsap from "gsap";

const INVITATION_TOKEN_KEY = "invitation_token";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

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
      if (playPromise?.then) {
        playPromise.then(() => setIsAudioPlaying(true)).catch(() => {});
      } else {
        setIsAudioPlaying(true);
      }
      return;
    }
    audio.pause();
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
    if (
      isValidating ||
      !isTokenValid ||
      !wrapperRef.current ||
      !contentRef.current
    ) {
      return;
    }

    const existing = ScrollSmoother.get();
    if (existing) {
      existing.kill();
    }

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });
    smoother.scrollTo(0, false);

    ScrollTrigger.refresh();

    return () => smoother?.kill();
  }, [isValidating, isTokenValid]);

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
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {!opened && (
            <EnvelopeIntro
              onFinish={() => setOpened(true)}
              onOpen={() => startLoopedAudio(audioRef, setIsAudioPlaying, 0.3)}
            />
          )}
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
              <section className={HomeStyles.storyPolaroidsPageTitle}>
                <h2 className="font-parisienne">Nuestra historia</h2>
              </section>
              <StoryPolaroids />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}








