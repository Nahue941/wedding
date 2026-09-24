export default function TreasureHuntHeader({ completedCount, totalCount }) {
  return (
    <div className="text-center mb-6">
      <h1 className="font-parisienne text-4xl sm:text-5xl mb-4">
        Búsqueda del Tesoro
      </h1>

      <p className="text-lg sm:text-xl leading-relaxed px-1 mb-4">
        Busquen los objetos de la lista y marquen cada uno cuando lo
        encuentren. El primer equipo en completar toda la lista grita
        ¡ZAPALLO! y llama a los novios para que la verifiquen.
      </p>

      <p
        aria-live="polite"
        className="
          inline-flex items-center justify-center
          px-5 py-2 rounded-full
          bg-brand-cream text-brand-wine
          text-lg sm:text-xl font-semibold tracking-wide
        "
      >
        {completedCount}/{totalCount} completados
      </p>
    </div>
  );
}
