import "./StoryPolaroids.css";

import PolaroidCard from "./PolaroidCard";
import { ScrollSmoother } from "gsap/ScrollSmoother";
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
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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

      const cards = gsap.utils.toArray(".card");
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
            endTrigger: ".container",
            scrub: true,
            pin: card,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => smoother?.kill();
    },
    { scope: contentRef },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        <div className="spacer"></div>
        <div className="container">
          <div className="stacked-cards">
            {POLAROID_ITEMS.map((item, index) => (
              <PolaroidCard
                key={item.id}
                // className="storyPolaroids__card"
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                caption={item.caption}
                index={index}
                date="25/09/2026"
              />
              /*

                     <div className="card" key={picture.id}>
                     <div className="img-wrapper">
                     <img src={picture.imageSrc} alt={picture.imageAlt} />
                     </div>
                     <div className="card-content">
                     <h1>{picture.caption}</h1>
                     <p>{picture?.date || "25/09/2026"}</p>
                     </div>
                     */
            ))}
          </div>
        </div>
      </div>
    </div>
    // <section className="storyPolaroids">
    //   <div className="storyPolaroids__inner">
    //     <div className="storyPolaroids__pinArea" ref={pinRef}>
    //       <div className="storyPolaroids__stack" ref={stackRef}>
    //         {POLAROID_ITEMS.map((item, index) => (
    //           <PolaroidCard
    //             key={item.id}
    //             className="storyPolaroids__card"
    //             imageSrc={item.imageSrc}
    //             imageAlt={item.imageAlt}
    //             caption={item.caption}
    //             index={index}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default StoryPolaroids;
