// Fisher-Yates shuffle. Does not mutate the input array.
export function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Picks a random, unique selection of songs to fill at most rows x columns
 * cells. Never duplicates a song, and never pads the result when there are
 * fewer available songs than the configured grid capacity — the caller
 * renders exactly as many cells as songs returned here.
 */
export function pickBoardSongs(allSongs, rows, columns) {
  const maxCells = rows * columns;
  const cellCount = Math.min(maxCells, allSongs.length);
  return shuffleArray(allSongs).slice(0, cellCount);
}
