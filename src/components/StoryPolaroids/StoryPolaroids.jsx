import PolaroidCard from "./PolaroidCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./StoryPolaroids.module.css";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const POLAROID_ITEMS = Array.from({ length: 8 }, (_, index) => {
  const year = 2018 + index;

  return {
    id: String(year),
    imageSrc: `/images/${year}.jpeg`,
    imageAlt: `Foto ${year}`,
    caption: String(year),
  };
});

function StoryPolaroids() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(
        "[data-polaroid-index]",
        containerRef.current,
      );
      const settleOffsets = cards.map((_, index) =>
        Math.max(120 - 40 * index, 0),
      );
      const initialRotations = cards.map(
        (_, index) => [-1, 1, 0, 2][index % 4],
      );
      const finalRotations = cards.map((_, index) => [-4, 2, -2, 3][index % 4]);

      cards.forEach((card, i) => {
        gsap.set(card, {
          rotation: initialRotations[i],
          zIndex: i + 1,
          y: settleOffsets[i],
        });

        gsap.to(card, {
          rotation: finalRotations[i],
          scale: 0.8 + 0.2 * (i / (cards.length - 1)),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top " + (15 + 35 * i),
            end: "bottom bottom",
            endTrigger: containerRef.current,
            scrub: true,
            pin: card,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        const image = card.querySelector("[data-polaroid-image]");
        const reveal = card.querySelector("[data-polaroid-reveal]");

        gsap.set(image, {
          filter: "grayscale(100%) saturate(0%) brightness(1.45)",
          opacity: 0.55,
          backgroundColor: "#f2f2f2",
        });

        gsap.set(reveal, {
          opacity: 1,
          backgroundColor: "#f2f2f2",
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top " + (15 + 35 * i),
          once: true,
          onEnter: () => {
            gsap.to(reveal, {
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            });
            gsap.to(image, {
              filter: "grayscale(0%) saturate(100%) brightness(100%)",
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.stackedCards}>
        {POLAROID_ITEMS.map((item, index) => (
          <PolaroidCard
            key={item.id}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            caption={item.caption}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default StoryPolaroids;
