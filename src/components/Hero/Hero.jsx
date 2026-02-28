import HeroCarousel from "./Carousel";
import Section from "../SectionComponent";

export default function Hero({ opened }) {
  const images = [
    "/images/Carousel1.jpeg",
    "/images/Carousel2.jpeg",
    "/images/Carousel3.jpeg",
  ];

  return (
    <Section
      className="relative overflow-hidden h-[80dvh] bg-brand-wine"
      centered={false}
    >
      {opened && <HeroCarousel images={images} />}

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Contenido encima */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-6 text-brand-cream">
          <h1 className="font-parisienne text-5xl sm:text-7xl tracking-wide mb-3">
            Naty
          </h1>
          <h1 className="font-parisienne text-5xl sm:text-7xl tracking-wide mb-3">
            &
          </h1>
          <h1 className="font-parisienne text-5xl sm:text-7xl tracking-wide mb-4">
            Nahue
          </h1>

          <h2 className="font-lato text-2xl sm:text-3xl mb-6">25.09.2026</h2>
        </div>
      </div>
    </Section>
  );
}
