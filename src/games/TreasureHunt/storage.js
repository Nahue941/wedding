const STORAGE_KEY = "treasure_hunt_completed";

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Reads the persisted completed-items map for this device. Keyed by the
 * item's own text (not its index), so editing TREASURE_HUNT_ITEMS later —
 * adding, removing or reordering items — never misaligns an unrelated
 * item's saved state.
 */
export function loadCompletedItems() {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return isPlainObject(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCompletedItems(completed) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  } catch {
    // Ignore storage errors (private mode, quota, etc.) — the game still
    // works in-memory for the current session.
  }
}
