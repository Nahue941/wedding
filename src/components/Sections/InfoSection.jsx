import Accordion from "../Accordion";
import Section from "../SectionComponent";

export default function InfoSection() {
  const accordionItems = [
    {
      id: "dresscode",
      title: "¿Qué me pongo? 🤔",
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

          <p className="mt-4 font-medium">⚠️ Atención mujeres ⚠️</p>

          <p>
            Está totalmente prohibido usar blanco y tonos claros, esos colores
            están reservados para la novia 😉🤍
          </p>
        </div>
      ),
    },
    {
      id: "menu",
      title: "¿Hay menú especial? Si ✅",
      content: (
        <p>Si tenés alguna restricción alimentaria, avisanos en el RSVP.</p>
      ),
    },
    {
      id: "niños",
      title: "¿Podemos llevar niños? No ❌",
      content: (
        <p>
          Queremos que esta noche la disfruten relajados, por eso será una
          celebración solo para adultos.
        </p>
      ),
    },
    {
      id: "auto",
      title: "¿Puedo ir con el auto? Si ✅",
      content: (
        <p>El salón cuenta con XX espacios para que puedan dejar sus autos.</p>
      ),
    },
  ];

  return (
    <Section className="bg-[#e9e4dd] px-6" id="info">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 mt-8">
        {/* Título */}
        <h2 className="text-3xl sm:text-5xl font-light text-center text-[#9c7446]">
          Información Útil
        </h2>

        {/* Accordion */}
        <Accordion items={accordionItems} />

        {/* Frase final */}
        <p className="text-center text-lg text-[#9c7446] mt-6 mb-8">
          ¡Que no pare la fiesta!
        </p>
      </div>
    </Section>
  );
}
