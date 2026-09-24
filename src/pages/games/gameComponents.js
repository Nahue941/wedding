import GuestBingo from "../../games/GuestBingo/GuestBingo";
import MusicBingo from "../../games/MusicBingo/MusicBingo";
import TreasureHunt from "../../games/TreasureHunt/TreasureHunt";

// Maps a game's slug (from src/config/games.js) to the component that
// implements it. A slug with no entry here still gets a route and a page
// (GamePage falls back to the generic "WIP" placeholder), so new games can
// be wired up in config first and implemented later without breaking
// anything.
export const gameComponents = {
  "bingo-invitados": GuestBingo,
  "bingo-canciones": MusicBingo,
  "busqueda-del-tesoro": TreasureHunt,
};
