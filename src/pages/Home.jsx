import CeremonySection from "../components/Sections/CeremonySection";
import DateSection from "../components/Sections/DateSection";
import Hero from "../components/Hero/Hero";
import InfoSection from "../components/Sections/InfoSection";

export default function Home() {
  return (
    <div className="relative">
      <div className="transition-all opacity-100 scale-100">
        <div className="snap-y snap-mandatory">
          <Hero opened />
          <DateSection />
          <CeremonySection />
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
