import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggleButton({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
      aria-pressed={isPlaying}
      className="
        fixed right-4 top-3/4 z-[9999]
        inline-flex h-12 w-12 items-center justify-center
        rounded-full bg-white/80 text-brand-wine
        pointer-events-auto
        shadow-lg ring-1 ring-black/10 backdrop-blur
        transition-transform duration-200 hover:scale-105 active:scale-95
      "
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
