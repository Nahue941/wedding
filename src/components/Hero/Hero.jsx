import Countdown from "./Countdown";
import HeroCarousel from "./Carousel";

export default function Hero({ opened }) {
  const weddingDate = new Date("2026-09-25T00:00:00");

  const images = [
    "/images/Carousel1.jpeg",
    "/images/Carousel2.jpeg",
    "/images/Carousel3.jpeg",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Carousel solo cuando opened */}
      {opened && <HeroCarousel images={images} />}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

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

          <Countdown targetDate={weddingDate} />
        </div>
      </div>
    </section>
  );
}
