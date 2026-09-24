import { Music } from "lucide-react";

export default function MusicBingoHeader() {
  return (
    <div className="text-center mb-6">
      <h1 className="font-parisienne text-4xl sm:text-5xl inline-flex items-center gap-2 mb-4">
        <Music size={30} className="shrink-0 -translate-y-1" />
        Bingo de canciones
      </h1>

      <p className="text-lg sm:text-xl leading-relaxed px-1">
        A lo largo de la noche va a estar sonando música, si escuchas alguna
        de estas marcalas. El primero en completar el grid se lleva premio.
        Gritá BINGO y mostraselo a los novios
      </p>
    </div>
  );
}
