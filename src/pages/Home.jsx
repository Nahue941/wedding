import { EASING, TRANSITION_TIME } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import EnvelopeIntro from "../components/Intro/EnvelopeIntro";
import Hero from "../components/Hero/Hero";
import InfoSection from "../components/Sections/InfoSection";
import RsvpModal from "../components/RsvpModal";
import StoryPolaroids from "../components/StoryPolaroids";
import HomeStyles from "./Home.module.css";

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
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

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
    if (isValidating || !isTokenValid || !wrapperRef.current || !contentRef.current) {
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
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
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

