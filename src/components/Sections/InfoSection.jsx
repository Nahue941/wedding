import Accordion from "../Accordion";
import InstagramIcon from "../Icons/InstagramIcon";
import Section from "../SectionComponent";

export default function InfoSection() {
  const accordionItems = [
    {
      id: "dresscode",
      title: "Que me pongo?",
      content: (
        <div className="space-y-3">
          <p>
            <strong>El Dress Code es ELEGANTE</strong>
          </p>

          <p>
            <strong>Ellos:</strong> traje + zapatos (nada de zapatillas)
          </p>

          <p>
            <strong>Ellas:</strong> vestidos largos
          </p>

          <p className="mt-4 font-medium">Atención mujeres</p>

          <p>
            Esta totalmente prohibido usar blanco y tonos claros, esos colores
            están reservados para la novia.
          </p>
        </div>
      ),
    },
    {
      id: "menu",
      title: "Hay menu especial? Si",
      content: (
        <p>Si tenes alguna restricción alimentaria, avisanos en el RSVP.</p>
      ),
    },
    {
      id: "niños",
      title: "Podemos llevar niños? No",
      content: (
        <p>
          Queremos que esta noche la disfruten relajados, por eso sera una
          celebración solo para adultos.
        </p>
      ),
    },
    {
      id: "auto",
      title: "Puedo ir con el auto? Si",
      content: (
        <p>El salon cuenta con XX espacios para que puedan dejar sus autos.</p>
      ),
    },
  ];

  return (
    <Section className="bg-brand-wine px-6 text-brand-cream" id="info">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 mt-8">
        <h2 className="text-3xl sm:text-5xl font-light text-center text-brand-cream">
          Información Util
        </h2>

        <Accordion items={accordionItems} />

        <div className="mt-6 mb-8 flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-brand-cream">
            Seguinos en nuestro instagram de la fiesta para enterarte las
            novedades
          </p>
          <a
            href="https://www.instagram.com/boda.naty.nahue/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram boda naty nahue"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream/10 text-brand-cream transition-transform duration-200 hover:scale-105"
          >
            <InstagramIcon size={40} />
          </a>
        </div>
      </div>
    </Section>
  );
}
