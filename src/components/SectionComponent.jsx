import clsx from "clsx";

export default function Section({ children, className, centered = true }) {
  return (
    <section
      className={clsx(
        "min-h-[85vh] snap-start",
        centered && "flex items-center justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
