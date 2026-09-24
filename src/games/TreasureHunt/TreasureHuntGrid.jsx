import TreasureHuntItem from "./TreasureHuntItem";

/**
 * Renders exactly `items.length` cards. Column count is never configured —
 * `auto-fill`/`minmax` lets the grid fit as many ~140px-wide cards as the
 * available width allows (more on desktop, fewer on mobile), wrapping into
 * additional rows as needed. No horizontal scroll, no fixed item count.
 */
export default function TreasureHuntGrid({ items, completed, onToggle }) {
  return (
    <div
      className="grid gap-2 sm:gap-3 w-full"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
    >
      {items.map((item) => (
        <TreasureHuntItem
          key={item}
          label={item}
          isCompleted={Boolean(completed[item])}
          onToggle={() => onToggle(item)}
        />
      ))}
    </div>
  );
}
