import { Calendar } from "lucide-react";
import Countdown from "@/components/Hero/Countdown";
import Section from "../SectionComponent";
import { WEDDING_DATE } from "../../utils/constants";

export default function DateSection() {
  const weddingDate = new Date(WEDDING_DATE);

  return (
    <Section className="bg-brand-wine px-6 text-brand-cream" id="date">
      <div className="max-w-4xl w-full text-center text-brand-cream my-8">
        <h2 className="font-parisienne text-5xl sm:text-7xl tracking-wide mb-8">
          ¡Nos casamos!
        </h2>

        <p className="font-parisienne text-2xl sm:text-3xl mb-2 opacity-90">
          Faltan para la boda...
        </p>

        <div className="bg-brand-cream text-brand-black rounded-2xl shadow-xl py-4 px-4 sm:px-10 mb-12">
          <Countdown targetDate={weddingDate} />
        </div>

        <p className="text-lg sm:text-2xl font-light mb-2 leading-relaxed">
          Guardate la fecha y preparate para festejar con nosotros.
        </p>
        <a
          href="/boda-naty-nahue.ics"
          download="boda-naty-nahue.ics"
          className="
            inline-flex items-center justify-center
            gap-2.5
            px-10 py-4
            bg-brand-cream
            text-brand-text
            rounded-full
            text-xl
            font-semibold
            tracking-wide
            shadow-md
            transition-all duration-300 ease-out
            cursor-pointer
            hover:bg-brand-blush
            hover:scale-105
            hover:shadow-xl
            active:scale-95
            "
        >
          <Calendar size={24} className="shrink-0 -translate-y-px" />
          AGENDAR FECHA
        </a>
      </div>
    </Section>
  );
}
