import { useState } from "react";

import { markGameDiscovered } from "./discoveredGames";

/**
 * Marks `gameId` as discovered for this device, once per mount.
 *
 * Deliberately NOT a useEffect: an effect commits after the page's first
 * render, and nothing would then trigger Navbar (which reads discovered
 * games with a plain synchronous call, no state/subscription) to re-render
 * and pick up the change — so on a guest's very first visit to a game, the
 * "Juegos" nav link would silently never appear on that page view.
 *
 * A lazy useState initializer runs synchronously during this component's
 * own render, before React descends into rendering its children (Navbar
 * included), so by the time Navbar reads localStorage, this game is
 * already recorded. It runs at most once per mount (React only discards
 * a second StrictMode dev call; markGameDiscovered is also idempotent
 * either way).
 */
export function useDiscoverGame(gameId) {
  useState(() => {
    markGameDiscovered(gameId);
    return null;
  });
}
