import { NavLink } from "react-router-dom";

const linkBaseClasses =
  "px-4 py-1.5 rounded-full text-sm sm:text-base tracking-wide transition-colors duration-200";

export default function Navbar() {
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
          Juegos
        </NavLink>
      </div>
    </nav>
  );
}
