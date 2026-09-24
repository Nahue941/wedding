import { Navigate, useParams } from "react-router-dom";

import GamePageLayout from "../../components/GamePageLayout";
import { getGameBySlug } from "../../config/games";
import { useDiscoverGame } from "../../lib/useDiscoverGame";
import { gameComponents } from "./gameComponents";

/**
 * Single dynamic page for every game route (/juegos/:slug).
 *
 * Adding a new game later only means adding an entry to
 * `src/config/games.js` (route/name) and, once it's implemented, to
 * `gameComponents.js` (which component to render) — no new route or page
 * file is needed here. Until a game has an entry in `gameComponents`, this
 * page renders a generic placeholder.
 *
 * Visiting this page is also what unlocks the game in progressive
 * discovery: useDiscoverGame records `slug` as discovered for this device
 * on the very first render, so a direct link works even if the guest has
 * never opened /juegos before.
 */
export default function GamePage() {
  const { slug } = useParams();
  const game = getGameBySlug(slug);

  useDiscoverGame(game ? slug : null);

  if (!game) {
    return <Navigate to="/juegos" replace />;
  }

  const GameComponent = gameComponents[slug];

  return (
    <GamePageLayout>
      {GameComponent ? (
        <GameComponent />
      ) : (
        <div className="text-center">
          <h1 className="font-parisienne text-4xl sm:text-5xl mb-4">
            {game.name}
          </h1>
          <p className="text-2xl sm:text-3xl tracking-widest opacity-80">
            WIP
          </p>
        </div>
      )}
    </GamePageLayout>
  );
}
