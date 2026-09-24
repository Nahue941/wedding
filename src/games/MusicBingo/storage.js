const STORAGE_KEY = "music_bingo_board";

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Reads the persisted Music Bingo board for this device, but only if it was
 * generated for the CURRENT grid configuration (rows x columns). If the
 * dimensions don't match — or nothing/invalid data is stored — returns
 * null so the caller generates a fresh board.
 */
export function loadPersistedBoard(rows, columns) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (
      !isPlainObject(parsed) ||
      parsed.rows !== rows ||
      parsed.columns !== columns ||
      !Array.isArray(parsed.songs) ||
      !isPlainObject(parsed.marked)
    ) {
      return null;
    }

    return { songs: parsed.songs, marked: parsed.marked };
  } catch {
    return null;
  }
}

export function saveBoard({ rows, columns, songs, marked }) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ rows, columns, songs, marked }),
    );
  } catch {
    // Ignore storage errors (private mode, quota, etc.) — the game still
    // works in-memory for the current session.
  }
}
