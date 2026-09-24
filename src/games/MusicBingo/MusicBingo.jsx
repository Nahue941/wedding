import MusicBingoGrid from "./MusicBingoGrid";
import MusicBingoHeader from "./MusicBingoHeader";
import { GRID_COLUMNS } from "./config";
import { useMusicBingoBoard } from "./useMusicBingoBoard";

/**
 * Music Bingo ("Bingo de canciones").
 *
 * Independent from Guest Bingo — shares only the global Navbar,
 * GamePageLayout and site styles. Its board, randomization and persistence
 * logic live entirely in this folder (config.js, songs.js, random.js,
 * storage.js, useMusicBingoBoard.js).
 */
export default function MusicBingo() {
  const { songs, marked, toggleMark } = useMusicBingoBoard();

  return (
    <div className="w-full max-w-md sm:max-w-2xl mx-auto">
      <MusicBingoHeader />
      <MusicBingoGrid
        columns={GRID_COLUMNS}
        songs={songs}
        marked={marked}
        onToggle={toggleMark}
      />
    </div>
  );
}
