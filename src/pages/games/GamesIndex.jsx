import { Link, Navigate } from "react-router-dom";

import GamePageLayout from "../../components/GamePageLayout";
import { games } from "../../config/games";
import { loadDiscoveredGames } from "../../lib/discoveredGames";

/**
 * Games menu (/juegos). Lists only the games this device has actually
 * discovered (visited via their direct URL) — never the full catalog in
 * src/config/games.js. If nothing has been discovered yet, this page
 * shouldn't be reachable at all, so it redirects home instead of showing
 * an empty/fake list.
 */
export default function GamesIndex() {
  const discoveredIds = loadDiscoveredGames();
  const discoveredGames = games.filter((game) =>
    discoveredIds.includes(game.slug),
  );

  if (discoveredGames.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <GamePageLayout>
      <div className="w-full max-w-md text-center">
        <h1 className="font-parisienne text-5xl sm:text-6xl mb-10">Juegos</h1>

        <div className="flex flex-col gap-4">
          {discoveredGames.map((game) => (
            <Link
              key={game.slug}
              to={`/juegos/${game.slug}`}
              className="
                inline-flex items-center justify-center
                px-6 py-4
                bg-brand-cream text-brand-wine
                text-lg font-semibold tracking-wide
                rounded-full shadow-md
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-lg active:scale-95
              "
            >
              {game.name}
            </Link>
          ))}
        </div>
      </div>
    </GamePageLayout>
  );
}
