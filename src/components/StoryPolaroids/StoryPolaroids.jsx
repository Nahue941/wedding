import { motion as Motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Section from "../SectionComponent";
import "./StoryPolaroids.css";

// Placeholder data. Replace later with real photos/text.
const POLAROID_ITEMS = [
  {
    id: "1",
    title: "Nuestra primera salida",
    date: "12/05/2021",
    imageSrc:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Nuestra primera salida",
  },
  {
    id: "2",
    title: "Noviazgo",
    date: "20/08/2021",
    imageSrc:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Noviazgo",
  },
  {
    id: "3",
    title: "Convivencia",
    date: "15/04/2023",
    imageSrc:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Convivencia",
  },
  {
    id: "4",
    title: "El si",
    date: "10/11/2025",
    imageSrc:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "El si",
  },
];

const CARD_ROTATIONS = [-3, 2, -2, 3];
const CARD_X_OFFSETS = [-8, 10, -6, 8];
const STEP_COOLDOWN_MS = 380;
const TOUCH_THRESHOLD = 18;

function isSectionFullyVisible(element) {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top >= -4 && rect.bottom <= viewportHeight + 4;
}

export default function StoryPolaroids({ items = POLAROID_ITEMS }) {
  const stageRef = useRef(null);
  const touchStartYRef = useRef(null);
  const lastStepAtRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const maxStep = Math.max(items.length - 1, 0);
  const [activeStep, setActiveStep] = useState(-1);
  const [isFullyActive, setIsFullyActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const fullyVisible = isSectionFullyVisible(stageRef.current);
      setIsFullyActive(fullyVisible);

      if (!fullyVisible) {
        setIsLocked(false);
      }
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const canStepNow = useCallback(() => {
    if (reduceMotion) {
      return true;
    }

    const now = Date.now();
    if (now - lastStepAtRef.current < STEP_COOLDOWN_MS) {
      return false;
    }

    lastStepAtRef.current = now;
    return true;
  }, [reduceMotion]);

  const advanceStep = useCallback((direction) => {
    if (!canStepNow()) {
      return false;
    }

    let didStep = false;

    setActiveStep((prev) => {
      if (direction > 0 && prev < maxStep) {
        didStep = true;
        return prev + 1;
      }

      if (direction < 0 && prev > -1) {
        didStep = true;
        return prev - 1;
      }

      return prev;
    });

    return didStep;
  }, [canStepNow, maxStep]);

  useEffect(() => {
    function onWheel(event) {
      const interactive = isSectionFullyVisible(stageRef.current);
      if (!interactive) {
        setIsLocked(false);
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (direction === 0) {
        return;
      }

      const leavingDown = direction > 0 && activeStep >= maxStep;
      const leavingUp = direction < 0 && activeStep <= -1;

      if (leavingDown || leavingUp) {
        setIsLocked(false);
        return;
      }

      event.preventDefault();
      setIsLocked(true);
      advanceStep(direction);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeStep, advanceStep, isFullyActive, maxStep]);

  useEffect(() => {
    function onTouchStart(event) {
      if (!isSectionFullyVisible(stageRef.current)) {
        setIsLocked(false);
        return;
      }

      if (event.touches?.length) {
        touchStartYRef.current = event.touches[0].clientY;
      }
    }

    function onTouchMove(event) {
      if (!isSectionFullyVisible(stageRef.current)) {
        setIsLocked(false);
        return;
      }

      if (touchStartYRef.current == null || !event.touches?.length) {
        return;
      }

      const currentY = event.touches[0].clientY;
      const delta = touchStartYRef.current - currentY;

      if (Math.abs(delta) < TOUCH_THRESHOLD) {
        return;
      }

      const direction = Math.sign(delta);
      const leavingDown = direction > 0 && activeStep >= maxStep;
      const leavingUp = direction < 0 && activeStep <= -1;

      if (leavingDown || leavingUp) {
        setIsLocked(false);
        touchStartYRef.current = currentY;
        return;
      }

      event.preventDefault();
      setIsLocked(true);
      advanceStep(direction);
      touchStartYRef.current = currentY;
    }

    function onTouchEnd() {
      touchStartYRef.current = null;
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [activeStep, advanceStep, maxStep]);

  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isLocked]);

  const stackHint = useMemo(() => {
    if (activeStep < 0) {
      return "Desliza para ver la primera instantanea";
    }

    if (activeStep === 0) {
      return "Desliza para descubrir nuestra historia";
    }

    if (activeStep >= maxStep) {
      return "Ultima instantanea. Continua desplazandote";
    }

    return "Sigue desplazandote";
  }, [activeStep, maxStep]);

  function getCardMotion(index) {
    const baseRotate = CARD_ROTATIONS[index % CARD_ROTATIONS.length];
    const baseX = CARD_X_OFFSETS[index % CARD_X_OFFSETS.length];
    const depth = Math.abs(index - activeStep);
    const isActive = index === activeStep;
    const isPast = index < activeStep;
    const isFuture = index > activeStep;
    const isBeforeStart = activeStep < 0;

    let y = depth * 16;
    let rotate = baseRotate;
    let scale = 1;
    let opacity = 1;
    let zIndex = items.length - index;
    let boxShadow = "0 10px 22px rgba(30, 20, 24, 0.16)";

    if (isPast) {
      y = 14 + (activeStep - index) * 15;
      rotate = baseRotate - 1.5;
      scale = 0.97;
      zIndex = 20 - (activeStep - index);
      boxShadow = "0 8px 16px rgba(30, 20, 24, 0.12)";
    }

    if (isFuture || isBeforeStart) {
      y = 34 + (index - activeStep) * 16;
      rotate = baseRotate + 0.5;
      scale = 0.96;
      zIndex = 8 - (index - activeStep);
      opacity = 0;
    }

    if (isActive) {
      y = 0;
      rotate = baseRotate * 0.4;
      scale = 1;
      zIndex = 40;
      boxShadow = "0 20px 36px rgba(30, 20, 24, 0.22)";
    }

    return {
      x: baseX,
      y,
      rotate,
      scale,
      opacity,
      zIndex,
      boxShadow,
    };
  }

  return (
    <Section
      centered={false}
      className={`storyPolaroids${isLocked ? " storyPolaroids--locked" : ""}`}
    >
      <div className="storyPolaroids__intro">
        <h2>Nuestra historia</h2>
        <p>Un recorrido en instantaneas de todo lo que vivimos juntos.</p>
      </div>

      <div className="storyPolaroids__stage" ref={stageRef}>
        <div className="storyPolaroids__stack">
          {items.map((item, index) => (
            <Motion.article
              key={item.id}
              className="storyPolaroids__card"
              initial={false}
              animate={getCardMotion(index)}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.52, ease: [0.2, 0.9, 0.2, 1] }
              }
            >
              <figure className="storyPolaroids__frame">
                <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
                <figcaption className="storyPolaroids__caption">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                </figcaption>
              </figure>
            </Motion.article>
          ))}
        </div>
      </div>

      <p className="storyPolaroids__hint" aria-live="polite">
        {stackHint}
      </p>
    </Section>
  );
}
