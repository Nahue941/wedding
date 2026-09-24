import { useState } from "react";

import { TREASURE_HUNT_ITEMS } from "./items";
import { loadCompletedItems, saveCompletedItems } from "./storage";

/**
 * Owns Treasure Hunt's completion state: which items (keyed by their own
 * text) are marked as found, persisted to localStorage and restored on
 * load. Mirrors the lazy useState initializer pattern already used by
 * Guest Bingo and Music Bingo, so state hydrates once per mount and a
 * React re-render never resets it.
 */
export function useTreasureHunt() {
  const [completed, setCompleted] = useState(loadCompletedItems);

  function toggleItem(item) {
    setCompleted((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      saveCompletedItems(next);
      return next;
    });
  }

  const completedCount = TREASURE_HUNT_ITEMS.filter(
    (item) => completed[item],
  ).length;

  return {
    items: TREASURE_HUNT_ITEMS,
    completed,
    toggleItem,
    completedCount,
    totalCount: TREASURE_HUNT_ITEMS.length,
  };
}
