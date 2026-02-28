export default function CountdownCard({ time }) {
  const items = [
    { label: "Días", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Min.", value: time.minutes },
    { label: "Seg.", value: time.seconds },
  ];

  return (
    <div className="grid grid-cols-4 items-center">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`
              relative flex flex-col items-center justify-center
              ${index !== items.length - 1 ? "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-12 after:w-px after:bg-brand-text/25" : ""}
            `}
        >
          <span className="text-3xl sm:text-4xl font-semibold text-brand-black">
            {item.value}
          </span>
          <span className="text-sm sm:text-base text-brand-text/85 mt-2">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
