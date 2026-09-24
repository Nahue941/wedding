import BingoCell from "./BingoCell";

/**
 * Renders `columns` (an array of arrays, each inner array a COLUMN) as a
 * grid of the same shape.
 *
 * Example: columns = [["A","B","C"], ["D","E","F"], ["G","H","I"]] renders
 *
 *   A | D | G
 *   B | E | H
 *   C | F | I
 *
 * Dimensions are never hardcoded — they come entirely from the shape of
 * `columns`, so a 4x5 config produces a 4x5 grid automatically.
 */
export default function BingoGrid({ columns, answers, onAnswerChange }) {
  const numColumns = columns.length;
  const numRows = Math.max(0, ...columns.map((column) => column.length));
  const rowIndexes = Array.from({ length: numRows }, (_, i) => i);

  return (
    <div
      className="grid gap-2 sm:gap-3 w-full"
      style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}
    >
      {rowIndexes.map((rowIndex) =>
        columns.map((column, columnIndex) => {
          const statement = column[rowIndex];
          const cellKey = `${columnIndex}-${rowIndex}`;

          if (statement == null) {
            return <div key={cellKey} aria-hidden="true" />;
          }

          return (
            <BingoCell
              key={cellKey}
              statement={statement}
              value={answers[cellKey]}
              onChange={(name) => onAnswerChange(cellKey, name)}
            />
          );
        }),
      )}
    </div>
  );
}
