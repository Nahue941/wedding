import MusicBingoCell from "./MusicBingoCell";

/**
 * Renders exactly `songs.length` cells (never padded to rows x columns) in
 * a grid with `columns` columns. The browser's default grid auto-flow
 * (row-by-row, left to right) naturally leaves the last row short when the
 * song count doesn't divide evenly — no placeholder cells needed.
 */
export default function MusicBingoGrid({ columns, songs, marked, onToggle }) {
  return (
    <div
      className="grid gap-1.5 sm:gap-3 w-full"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {songs.map((entry, index) => (
        <MusicBingoCell
          key={`${entry.song}-${entry.artist}`}
          song={entry.song}
          artist={entry.artist}
          year={entry.year}
          isMarked={Boolean(marked[index])}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  );
}
