import Navbar from "./Navbar";

/**
 * Shared layout for every /juegos/* page.
 *
 * Owns only the global structure: navigation, background, typography and
 * spacing. It knows nothing about any particular game — each game page is
 * responsible for its own content, rendered as `children`.
 */
export default function GamePageLayout({ children }) {
  return (
    <div className="min-h-screen bg-brand-wine text-brand-cream flex flex-col font-lato">
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center px-6 pb-16"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)" }}
      >
        {children}
      </main>
    </div>
  );
}
