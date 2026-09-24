import Navbar from "./Navbar";

/**
 * Shared layout for every /juegos/* page.
 *
 * Owns only the global structure: navigation, background, typography and
 * spacing. It knows nothing about any particular game — each game page is
 * responsible for its own content, rendered as `children`.
 *
 * Content is top-aligned (not vertically centered): games like the bingo
 * board can be taller than the viewport on small phones, and centering a
 * taller-than-container element would push it up behind the fixed navbar.
 * Top alignment plus generous top padding keeps everything visible and lets
 * the page scroll normally.
 */
export default function GamePageLayout({ children }) {
  return (
    <div className="min-h-screen bg-brand-wine text-brand-cream flex flex-col font-lato">
      <Navbar />
      <main
        className="flex-1 flex items-start justify-center px-6 pb-16"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)" }}
      >
        {children}
      </main>
    </div>
  );
}
