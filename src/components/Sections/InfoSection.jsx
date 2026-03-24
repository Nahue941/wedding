import {
  Baby,
  Car,
  ClipboardCheck,
  Clock,
  Shirt,
  TriangleAlert,
  UserPlus,
  Utensils,
} from "lucide-react";

import Accordion from "../Accordion";
import InstagramIcon from "../Icons/InstagramIcon";
import Section from "../SectionComponent";

export default function InfoSection() {
  const accordionItems = [
    {
      id: "dresscode",
      title: (
        <span className="inline-flex items-center gap-2">
          <Shirt size={18} />
          ¿Qué me pongo?
        </span>
      ),
      content: (
        <div className="space-y-3">
          <p className="font-normal">
            <strong>El Dress Code es ELEGANTE</strong>
          </p>

          <p className="font-normal">
            <strong>Ellos:</strong> traje + zapatos (nada de zapatillas)
          </p>

          <p className="font-normal">
            <strong>Ellas:</strong> vestidos largos
          </p>

          <span className="inline-flex items-center gap-2">
            <TriangleAlert size={20} />
            <p className="font-medium">Atención mujeres:</p>
          </span>

          <p className="font-normal">
            <span className="font-semibold">
              Esta totalmente prohibido usar blanco
            </span>{" "}
            y tonos claros, esos colores están reservados para la novia.
          </p>
        </div>
      ),
    },
    {
      id: "menu",
      title: (
        <span className="inline-flex items-center gap-2">
          <Utensils size={18} />
          ¿Hay menu especial?
        </span>
      ),
      content: (
        <>
          <p className="font-normal">Si.</p>
          <p className="font-normal">
            Si tenés alguna restricción alimentaria,{" "}
            <span className="font-bold">avisanos en la confirmación.</span>
          </p>
        </>
      ),
    },
    {
      id: "niños",
      title: (
        <span className="inline-flex items-center gap-2">
          <Baby size={18} />
          ¿Podemos llevar niños?
        </span>
      ),
      content: (
        <>
          <p className="font-normal">No.</p>
          <p className="font-normal">
            La celebración será solo para{" "}
            <span className="font-bold">mayores de 16 años</span>. Queremos que
            todos puedan disfrutar la noche con tranquilidad.
          </p>
        </>
      ),
    },
    {
      id: "auto",
      title: (
        <span className="inline-flex items-center gap-2">
          <Car size={18} />
          ¿Puedo ir con el auto?
        </span>
      ),
      content: (
        <>
          <p className="font-normal">Si.</p>
          <p className="font-normal">
            El salon cuenta con espacios para que puedan dejar sus vehículos.
          </p>
        </>
      ),
    },
    {
      id: "hora",
      title: (
        <span className="inline-flex items-center gap-2">
          <Clock size={18} />
          ¿A qué hora debo llegar?
        </span>
      ),
      content: (
        <>
          <p className="font-normal">
            Nuestra ceremonia comenzará puntual a las 20:00 hs.
          </p>
          <p className="font-normal">
            <span className="font-bold">
              Les pedimos que lleguen entre 15 y 20 minutos antes
            </span>
            , así podemos comenzar a tiempo.
          </p>
        </>
      ),
    },
    {
      id: "acompañante",
      title: (
        <span className="inline-flex items-center gap-2">
          <UserPlus size={18} />
          ¿Puedo llevar un invitado?
        </span>
      ),
      content: (
        <>
          <p className="font-normal">
            Si tu invitación incluye un acompañante,{" "}
            <span className="font-semibold">¡si!</span>
          </p>
          <p className="font-normal">
            De lo contrario, nos gustaría que nuestra boda fuera un{" "}
            <span className="font-semibold">evento íntimo</span>, solo con
            familiares y amigos cercanos.
          </p>
          <p className="font-semibold">Ante la duda, ¡consultanos!</p>
        </>
      ),
    },
    {
      id: "confirmacion",
      title: (
        <span className="inline-flex items-center gap-2">
          <ClipboardCheck size={18} />
          ¿Cómo confirmo asistencia?
        </span>
      ),
      content: (
        <>
          <p className="font-normal">
            Podés confirmar desde esta misma invitación tocando el botón{" "}
            <span className="font-semibold">"confirmar asistencia"</span> y
            llenando el formulario.
          </p>
          <p className="font-bold">Te pedimos hacerlo antes del 1/9/26.</p>
        </>
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
          <p className="text-lg sm:text-2xl text-brand-cream">
            Seguinos en nuestro instagram de la fiesta para enterarte las
            novedades
          </p>
          <a
            href="https://www.instagram.com/boda.naty.nahue/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram boda naty nahue"
            className="inline-flex h-14 w-14 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-brand-cream/10 text-brand-cream transition-transform duration-200 hover:scale-105"
          >
            <InstagramIcon size={40} />
          </a>
        </div>
      </div>
    </Section>
  );
}
