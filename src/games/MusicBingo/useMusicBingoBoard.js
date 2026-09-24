import { useState } from "react";

import { GRID_COLUMNS, GRID_ROWS } from "./config";
import { pickBoardSongs } from "./random";
import { songs as allSongs } from "./songs";
import { loadPersistedBoard, saveBoard } from "./storage";

function createInitialBoard() {
  const stored = loadPersistedBoard(GRID_ROWS, GRID_COLUMNS);
  if (stored) {
    return stored;
  }

  const board = pickBoardSongs(allSongs, GRID_ROWS, GRID_COLUMNS);
  const marked = {};
  saveBoard({ rows: GRID_ROWS, columns: GRID_COLUMNS, songs: board, marked });
  return { songs: board, marked };
}

/**
 * Owns the Music Bingo board: generating it once (only when no valid
 * persisted board exists for the current GRID_ROWS x GRID_COLUMNS), and
 * toggling/persisting marked cells.
 *
 * The lazy useState initializer below runs at most once per mount, so a
 * React re-render never regenerates or reshuffles the board.
 */
export function useMusicBingoBoard() {
  const [board, setBoard] = useState(createInitialBoard);

  function toggleMark(index) {
    setBoard((prev) => {
      const marked = { ...prev.marked, [index]: !prev.marked[index] };
      saveBoard({
        rows: GRID_ROWS,
        columns: GRID_COLUMNS,
        songs: prev.songs,
        marked,
      });
      return { ...prev, marked };
    });
  }

  return { songs: board.songs, marked: board.marked, toggleMark };
}
