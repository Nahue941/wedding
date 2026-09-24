import { Check } from "lucide-react";

/**
 * A single treasure-hunt item. Exactly two states — incomplete (light,
 * default) and completed (the project's dark red, with a Check badge) —
 * mirroring how Guest Bingo / Music Bingo mark a cell as done. Always
 * toggleable, even once completed, so an accidental tap can be undone.
 */
export default function TreasureHuntItem({ label, isCompleted, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isCompleted}
      aria-label={`${label}${isCompleted ? " (encontrado)" : ""}`}
      className={`
        relative flex items-center justify-center text-center
        rounded-xl px-4 py-4 min-h-[64px]
        text-sm sm:text-base font-medium leading-snug
        shadow-sm transition-colors duration-200 ease-out
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-cream focus-visible:ring-offset-2
        focus-visible:ring-offset-brand-wine
        ${
          isCompleted
            ? "bg-brand-wine text-brand-cream ring-1 ring-brand-wine pl-10"
            : "bg-brand-cream/70 text-brand-wine ring-1 ring-brand-wine/25"
        }
      `}
    >
      {isCompleted && (
        <span className="absolute left-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-cream text-brand-wine">
          <Check size={14} strokeWidth={3} />
        </span>
      )}
      {label}
    </button>
  );
}
