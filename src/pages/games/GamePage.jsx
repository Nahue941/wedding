import { Navigate, useParams } from "react-router-dom";

import GamePageLayout from "../../components/GamePageLayout";
import { getGameBySlug } from "../../config/games";

/**
 * Single dynamic page for every game route (/juegos/:slug).
 *
 * Adding a new game later only means adding an entry to `src/config/games.js`
 * — no new route or page file is needed here. This page currently renders a
 * placeholder; the real game UI/logic will replace the content below in a
 * future task.
 */
export default function GamePage() {
  const { slug } = useParams();
  const game = getGameBySlug(slug);

  if (!game) {
    return <Navigate to="/juegos" replace />;
  }

  return (
    <GamePageLayout>
      <div className="text-center">
        <h1 className="font-parisienne text-4xl sm:text-5xl mb-4">
          {game.name}
        </h1>
        <p className="text-2xl sm:text-3xl tracking-widest opacity-80">WIP</p>
      </div>
    </GamePageLayout>
  );
}
