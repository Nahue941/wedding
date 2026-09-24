const STORAGE_KEY = "discovered_games";

function isStringArray(value) {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

/**
 * Reads the list of game ids (slugs, matching src/config/games.js) that
 * this device/browser has discovered so far — i.e. actually visited via
 * their direct game URL. Empty array if none, or if storage is
 * unavailable/blocked/corrupted.
 */
export function loadDiscoveredGames() {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return isStringArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDiscoveredGames(discovered) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(discovered));
  } catch {
    // Ignore storage errors (private mode, quota, etc.) — discovery still
    // works for this page view, it just won't persist.
  }
}

/**
 * Marks `gameId` as discovered for this device. Idempotent — visiting the
 * same game again just returns the same list unchanged. Returns the
 * updated (or unchanged) list.
 *
 * To reset progressive discovery during development, clear this key
 * (`discovered_games`) from localStorage in DevTools — there is
 * intentionally no UI control for it.
 */
export function markGameDiscovered(gameId) {
  const current = loadDiscoveredGames();
  if (!gameId || current.includes(gameId)) {
    return current;
  }
  const next = [...current, gameId];
  saveDiscoveredGames(next);
  return next;
}

export function hasDiscoveredAnyGame() {
  return loadDiscoveredGames().length > 0;
}
