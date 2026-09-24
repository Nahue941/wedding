import { Check } from "lucide-react";

/**
 * A single song cell. Exactly two states: unmarked (light/default) and
 * marked (the project's dark red, with a Check badge). No other visual
 * states — no partial/correct/loading/animation states.
 */
export default function MusicBingoCell({ song, artist, year, isMarked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isMarked}
      aria-label={`${song} - ${artist}${isMarked ? " (marcada)" : ""}`}
      className={`
        relative flex flex-col justify-center items-center text-center gap-0.5
        rounded-lg sm:rounded-xl p-1.5 sm:p-3
        min-h-[80px] sm:min-h-[108px]
        shadow-sm transition-colors duration-200 ease-out
        active:scale-95
        ${
          isMarked
            ? "bg-brand-wine text-brand-cream ring-1 ring-brand-wine"
            : "bg-brand-cream/70 text-brand-wine ring-1 ring-brand-wine/25"
        }
      `}
    >
      {isMarked && (
        <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-brand-cream text-brand-wine">
          <Check size={12} strokeWidth={3} className="sm:hidden" />
          <Check size={14} strokeWidth={3} className="hidden sm:block" />
        </span>
      )}

      <span className="text-[11px] sm:text-base font-semibold leading-tight break-words line-clamp-3">
        {song}
      </span>
      <span className="text-[9px] sm:text-xs font-normal opacity-80 leading-tight line-clamp-2">
        {artist}
      </span>
      {year != null && (
        <span className="hidden sm:inline text-[10px] font-normal opacity-60">
          {year}
        </span>
      )}
    </button>
  );
}
