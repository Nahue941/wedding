import Section from "../SectionComponent";

export default function CeremonySection() {
  return (
    <Section className="bg-[#f3f1ee] px-6">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-3xl sm:text-5xl font-light text-[#9c7446] mb-8 mt-8">
          Ceremonia + Celebración
        </h2>

        {/* Fecha + Hora */}
        <div className="w-full bg-[#e7e3dd] rounded-xl py-6 px-4 mb-10">
          <div className="grid grid-cols-2 divide-x divide-[#d6d1ca]">
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-medium text-[#5c5c5c]">20</span>
              <span className="text-sm tracking-wide text-[#5c5c5c] mt-1">
                DICIEMBRE
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-medium text-[#5c5c5c]">20:00</span>
              <span className="text-sm tracking-wide text-[#5c5c5c] mt-1">
                HORAS
              </span>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="w-full mb-10">
          <img
            src="/images/Salon.jpeg"
            alt="Ceremonia"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Lugar */}
        <h3 className="text-2xl sm:text-3xl font-light text-[#b78952] mb-4">
          Jano´s Moreno
        </h3>

        <p className="text-lg text-[#b78952] mb-10">
          Av Francisco Piovano 3787, Moreno
        </p>

        {/* Botón */}
        <a
          href="https://maps.app.goo.gl/VKRwZpnegZjCGwiD8"
          target="_blank"
          rel="noopener noreferrer"
          className="
                px-8 py-4
                mb-8
                bg-[#9c7446]
                text-white
                rounded-lg
                tracking-wide
                shadow-md
                transition-all duration-300 ease-out
                hover:scale-105
                hover:shadow-lg
                active:scale-95
                cursor-pointer
                inline-flex items-center justify-center"
        >
          UBICACIÓN
        </a>
      </div>
    </Section>
  );
}
