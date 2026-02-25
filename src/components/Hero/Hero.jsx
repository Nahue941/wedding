import Countdown from "./Countdown";

export default function Hero() {
  const weddingDate = new Date("2026-09-25T00:00:00");

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-light tracking-wide mb-4">
          Nos casamos
        </h1>

        <h2 className="text-xl sm:text-2xl font-light mb-6">25/09/2026</h2>

        <Countdown targetDate={weddingDate} />
      </div>
    </section>
  );
}
