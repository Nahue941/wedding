import Autoplay from "embla-carousel-autoplay";
import { CAROUSEL_DELAY_IN_MS } from "@utils/constants";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

export default function HeroCarousel({ images }) {
  const autoplay = useRef(
    Autoplay({
      delay: CAROUSEL_DELAY_IN_MS,
      stopOnInteraction: false,
    }),
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current],
  );

  return (
    <div className="h-[85vh] w-full overflow-hidden">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, i) => (
            <div
              key={i}
              className="
                flex-[0_0_100%]
                md:flex-[0_0_50%]
                lg:flex-[0_0_33.333%]
                h-full
              "
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
