import TreasureHuntList from "./TreasureHuntGrid";
import TreasureHuntHeader from "./TreasureHuntHeader";
import { useTreasureHunt } from "./useTreasureHunt";

/**
 * Treasure Hunt ("Búsqueda del Tesoro").
 *
 * Independent from Guest Bingo and Music Bingo — shares only the global
 * Navbar, GamePageLayout and site styles. Its item list, completion state
 * and persistence logic live entirely in this folder.
 */
export default function TreasureHunt() {
  const { items, completed, toggleItem, completedCount, totalCount } =
    useTreasureHunt();

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto">
      <TreasureHuntHeader
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <TreasureHuntList
        items={items}
        completed={completed}
        onToggle={toggleItem}
      />
    </div>
  );
}
