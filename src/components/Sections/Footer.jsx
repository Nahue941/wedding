import Section from "../SectionComponent";

export default function Footer() {
  return (
    <Section
      className="bg-brand-cream px-6 pt-10 pb-24 sm:pb-10  text-brand-text"
      id="footer"
      centered={false}
      minHeightClass="min-h-0"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <p className="text-xl sm:text-3xl text-brand-text mb-4">
          ¡Los esperamos para festejar juntos esta noche tan especial!
        </p>
        <p className="text-3xl sm:text-6xl text-brand-text mb-4 font-parisienne">
          Naty & Nahue
        </p>
      </div>
    </Section>
  );
}
