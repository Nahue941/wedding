import HeroCarousel from "./Carousel";
import Section from "../SectionComponent";

export default function Hero({ opened }) {
  const images = [
    "/images/Carousel1.jpeg",
    "/images/Carousel2.jpeg",
    "/images/Carousel3.jpeg",
  ];

  return (
    <Section className="relative overflow-hidden" centered={false}>
      {opened && <HeroCarousel images={images} />}

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Contenido encima */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-6 text-white">
            <h1 className="text-4xl sm:text-6xl font-light tracking-wide mb-4">
              Naty
            </h1>
            <h1 className="text-4xl sm:text-6xl font-light tracking-wide mb-4">
              y
            </h1>
            <h1 className="text-4xl sm:text-6xl font-light tracking-wide mb-4">
              Nahue
            </h1>

            <h2 className="text-xl sm:text-2xl font-light mb-6">25.90.2026</h2>
          </div>
        </div>
      </div>
    </Section>
  );
}
