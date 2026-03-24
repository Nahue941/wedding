import clsx from "clsx";

export default function Section({ children, className, centered = true, minHeightClass = "min-h-[60vh]" }) {
  return (
    <section
      className={clsx(
        `${minHeightClass} snap-start`,
        centered && "flex items-center justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}

