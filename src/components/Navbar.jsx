import { ArrowLeft } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { hasDiscoveredAnyGame } from "../lib/discoveredGames";

const linkBaseClasses =
  "inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm sm:text-base tracking-wide transition-colors duration-200";

/**
 * Fixed top navigation. Always shows "Inicio". "Juegos" is shown only once
 * at least one game has been discovered on this device — except when
 * `alwaysShowGames` is set (game pages pass this, since being on a game
 * page already means that game is/just became discovered).
 *
 * The back arrow lives on "Juegos", and only while inside an individual
 * game (/juegos/:slug) — that's the one place "go back" is a meaningful
 * action. It disappears on the Games menu itself (/juegos) and on Inicio.
 */
export default function Navbar({ alwaysShowGames = false }) {
  const { pathname } = useLocation();
  const showGames = alwaysShowGames || hasDiscoveredAnyGame();
  const isInsideGame = pathname !== "/juegos" && pathname.startsWith("/juegos/");

  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 flex justify-center pointer-events-none"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-cream/90 px-1.5 py-1.5 shadow-md ring-1 ring-brand-wine/10 backdrop-blur pointer-events-auto">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive
                ? "bg-brand-wine text-brand-cream"
                : "text-brand-wine hover:bg-brand-wine/10"
            }`
          }
        >
          Inicio
        </NavLink>
        {showGames && (
          <NavLink
            to="/juegos"
            className={({ isActive }) =>
              `${linkBaseClasses} ${
                isActive
                  ? "bg-brand-wine text-brand-cream"
                  : "text-brand-wine hover:bg-brand-wine/10"
              }`
            }
          >
            {isInsideGame && <ArrowLeft size={16} className="shrink-0" />}
            Juegos
          </NavLink>
        )}
      </div>
    </nav>
  );
}
