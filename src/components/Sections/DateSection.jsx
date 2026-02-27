import Countdown from "@/components/Hero/Countdown";
import Section from "../SectionComponent";
import { WEDDING_DATE } from "../../utils/constants";

export default function DateSection() {
  const weddingDate = new Date(WEDDING_DATE);

  return (
    <Section className="bg-[#d2a56f] px-6 text-white">
      <div className="max-w-4xl w-full text-center text-white">
        {/* Título */}
        <h2 className="text-4xl sm:text-6xl font-light tracking-wide mb-8">
          ¡Nos casamos!
        </h2>

        {/* Subtexto */}
        <p className="text-lg sm:text-2xl font-light mb-8 leading-relaxed">
          Guardate la fecha y preparate para festejar con nosotros.
        </p>

        <p className="text-lg sm:text-xl font-light mb-12 opacity-90">
          Faltan para la boda...
        </p>

        {/* Countdown */}
        <div className="bg-white text-[#b78952] rounded-2xl shadow-xl py-4 px-4 sm:px-10 mb-12">
          <Countdown targetDate={weddingDate} />
        </div>

        {/* Botón calendar */}
        <a
          href="/boda-naty-nahue.ics"
          download="boda-naty-nahue.ics"
          className="
            inline-flex items-center justify-center
            px-10 py-4
            bg-white/80
            text-[#8c6338]
            rounded-full
            text-lg
            tracking-wide
            shadow-md

            transition-all duration-300 ease-out
            cursor-pointer

            hover:bg-white
            hover:scale-105
            hover:shadow-xl

            active:scale-95
            "
        >
          AGENDAR FECHA
        </a>
      </div>
    </Section>
  );
}
