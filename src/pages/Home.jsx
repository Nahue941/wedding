import Hero from "@components/Hero/Hero";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryPolaroids from "@components/StoryPolaroids";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import styles from "./Home.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (ScrollSmoother.get()) {
        ScrollSmoother.get().kill();
      }

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => smoother?.kill();
    },
    { scope: wrapperRef },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        <Hero opened />
        <section className={styles.storyPolaroidsPageTitle}>
          <h2>Nuestra historia</h2>
        </section>
        <StoryPolaroids />
      </div>
    </div>
  );
}
