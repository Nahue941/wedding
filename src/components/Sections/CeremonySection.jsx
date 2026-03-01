import { MapPin } from "lucide-react";
import Section from "../SectionComponent";

export default function CeremonySection() {
  return (
    <Section className="bg-brand-cream px-6 text-brand-text" id="ceremony">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-light text-brand-text mb-8 mt-8">
          Ceremonia + Celebracion
        </h2>

        <div className="w-full bg-brand-blush/65 rounded-xl py-6 px-4 mb-10">
          <div className="grid grid-cols-2 divide-x divide-brand-smoke/30">
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-medium text-brand-black">25</span>
              <span className="text-sm tracking-wide text-brand-black mt-1">
                SEPTIEMBRE
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-medium text-brand-black">
                20:00
              </span>
              <span className="text-sm tracking-wide text-brand-black mt-1">
                HORAS
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mb-10">
          <img
            src="/images/Salon.jpeg"
            alt="Ceremonia"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <h3 className="text-2xl sm:text-3xl font-light text-brand-text mb-4">
          Janos Moreno
        </h3>

        <p className="text-lg text-brand-text mb-10">
          Av Francisco Piovano 3787, Moreno
        </p>
        <a
          href="https://maps.app.goo.gl/VKRwZpnegZjCGwiD8"
          target="_blank"
          rel="noopener noreferrer"
          className="
          px-8 py-4
          mb-8
          bg-brand-text
          text-brand-cream
          rounded-full
          gap-2.5
          tracking-wide
          shadow-md
          transition-all duration-300 ease-out
          hover:scale-105
          hover:shadow-lg
          active:scale-95
          cursor-pointer
          inline-flex items-center justify-center"
        >
          <MapPin size={18} className="shrink-0 -translate-y-px" />
          UBICACIÓN
        </a>
      </div>
    </Section>
  );
}
