import TreasureHuntItem from "./TreasureHuntItem";

/**
 * Renders `items.length` rows, always stacked vertically — one item per
 * row at every viewport width, mobile through desktop. No CSS grid, no
 * multi-column layout, no wrapping: a simple flex column.
 */
export default function TreasureHuntList({ items, completed, onToggle }) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
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
