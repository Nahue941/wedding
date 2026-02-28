import Accordion from "../Accordion";
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

          <p className="mt-4 font-medium">Atencion mujeres</p>

          <p>
            Esta totalmente prohibido usar blanco y tonos claros, esos colores
            estan reservados para la novia.
          </p>
        </div>
      ),
    },
    {
      id: "menu",
      title: "Hay menu especial? Si",
      content: (
        <p>Si tenes alguna restriccion alimentaria, avisanos en el RSVP.</p>
      ),
    },
    {
      id: "ninos",
      title: "Podemos llevar ninos? No",
      content: (
        <p>
          Queremos que esta noche la disfruten relajados, por eso sera una
          celebracion solo para adultos.
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
    <Section className="bg-brand-smoke px-6 text-brand-cream" id="info">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 mt-8">
        <h2 className="text-3xl sm:text-5xl font-light text-center text-brand-cream">
          Informacion Util
        </h2>

        <Accordion items={accordionItems} />

        <p className="text-center text-lg text-brand-cream mt-6 mb-8">
          Que no pare la fiesta!
        </p>
      </div>
    </Section>
  );
}
