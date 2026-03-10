import styles from "./StoryPolaroids.module.css";

import PolaroidCard from "./PolaroidCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const POLAROID_ITEMS = [
  {
    id: "1",
    imageSrc:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 1",
    caption: "Sample",
  },
  {
    id: "2",
    imageSrc:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 2",
    caption: "Sample",
  },
  {
    id: "3",
    imageSrc:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 3",
    caption: "Sample",
  },
  {
    id: "4",
    imageSrc:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 4",
    caption: "Sample",
  },
];

function StoryPolaroids() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray("[data-polaroid-index]", containerRef.current);
      const settleOffsets = [120, 80, 40, 0];
      const initialRotations = [-1, 1, 0, 2];
      const finalRotations = [-4, 2, -2, 3];

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
        });

        gsap.set(reveal, {
          opacity: 1,
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
            date="25/09/2026"
          />
        ))}
      </div>
    </div>
  );
}

export default StoryPolaroids;
