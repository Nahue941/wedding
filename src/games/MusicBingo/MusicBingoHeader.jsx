import { Music } from "lucide-react";

export default function MusicBingoHeader() {
  return (
    <div className="text-center mb-6">
      <h1 className="font-parisienne text-4xl sm:text-5xl inline-flex items-center gap-2 mb-4">
        <Music size={30} className="shrink-0 -translate-y-1" />
        Bingo de canciones
      </h1>

      <p className="text-xl sm:text-2xl leading-relaxed px-1">
        A lo largo de la noche va a estar sonando música, si escuchas alguna de
        estas canciones marcalas. La primera COLUMNA completada, tiene premio.
        Los primeros 2 bingos completos también. Gritá LINEA o BINGO y
        mostráselo a los novios
      </p>
    </div>
  );
}
