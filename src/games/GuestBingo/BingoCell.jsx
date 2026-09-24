import { useEffect, useRef, useState } from "react";

/**
 * A single bingo cell. Shows the statement in a light, "tap me" state when
 * empty; once a name is entered it switches to a filled, stronger state
 * showing the name with the statement as a small caption.
 */
export default function BingoCell({ statement, value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const isFilled = Boolean(value && value.trim());

  function startEditing() {
    setDraft(value ?? "");
    setIsEditing(true);
  }

  function commit() {
    onChange(draft.trim());
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div
        className="
          flex flex-col justify-center gap-1.5
          rounded-xl p-2.5 sm:p-3
          bg-white
          ring-2 ring-brand-wine
          min-h-[104px] sm:min-h-[120px]
        "
      >
        <p className="text-sm sm:text-base font-medium text-brand-wine/70 leading-snug line-clamp-2">
          {statement}
        </p>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          placeholder="Nombre..."
          className="
            w-full rounded-lg border border-brand-wine/30
            px-2 py-1.5 text-base sm:text-lg text-brand-text
            focus:outline-none focus:ring-2 focus:ring-brand-wine/50
          "
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className={`
        flex flex-col justify-center items-center text-center gap-1.5
        rounded-xl p-2.5 sm:p-3
        min-h-[104px] sm:min-h-[120px]
        shadow-sm transition-all duration-200 ease-out
        hover:scale-[1.03] active:scale-95
        ${
          isFilled
            ? "bg-brand-wine text-brand-cream ring-1 ring-brand-wine"
            : "bg-brand-cream/70 text-brand-wine ring-1 ring-brand-wine/25"
        }
      `}
    >
      {isFilled ? (
        <>
          <span className="text-base sm:text-lg font-semibold leading-snug break-words">
            {value}
          </span>
          <span className="text-xs sm:text-sm font-normal opacity-80 leading-snug line-clamp-2">
            {statement}
          </span>
        </>
      ) : (
        <span className="text-sm sm:text-base font-medium leading-snug line-clamp-4">
          {statement}
        </span>
      )}
    </button>
  );
}
