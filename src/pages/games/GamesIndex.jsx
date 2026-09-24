import { Link } from "react-router-dom";

import GamePageLayout from "../../components/GamePageLayout";
import { games } from "../../config/games";

export default function GamesIndex() {
  return (
    <GamePageLayout>
      <div className="w-full max-w-md text-center">
        <h1 className="font-parisienne text-5xl sm:text-6xl mb-10">Juegos</h1>

        <div className="flex flex-col gap-4">
          {games.map((game) => (
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
