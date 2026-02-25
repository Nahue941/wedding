import Countdown from "./Countdown";

export default function Hero() {
  const weddingDate = new Date("2026-09-25T00:00:00");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background image */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/hero.jpeg')]
          bg-no-repeat
          bg-center
          bg-contain
          sm:bg-cover
          filter grayscale blur-sm
          scale-105
        "
      />

      {/* Dark overlay opcional para mejor contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 text-white">
        <h1 className="text-4xl sm:text-6xl font-light tracking-wide mb-4 drop-shadow-md">
          Nos casamos
        </h1>

        <h2 className="text-xl sm:text-2xl font-light mb-6 drop-shadow-sm">
          25/09/2026
        </h2>

        <div className="drop-shadow-sm">
          <Countdown targetDate={weddingDate} />
        </div>
      </div>
    </section>
  );
}
