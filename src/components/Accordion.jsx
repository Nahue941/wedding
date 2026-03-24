import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Accordion({
  items,
  allowMultiple = false,
  className = "",
}) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    } else {
      setOpenIndexes((prev) => (prev[0] === index ? [] : [index]));
    }
  };

  const isOpen = (index) => openIndexes.includes(index);

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {items.map((item, index) => {
        const open = isOpen(index);

        return (
          <div
            key={item.id}
            className="bg-brand-cream/95 rounded-2xl shadow-md overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              className="
                w-full flex items-center justify-between
                px-6 py-5
                text-left
                text-xl font-medium
                text-brand-wine
                cursor-pointer
                transition-all duration-300 ease-out
              "
            >
              {item.title}

              <span
                className={`
                  transition-transform duration-300
                  ${open ? "rotate-180" : ""}
                `}
              >
                <ChevronDown size={24} className="shrink-0 -translate-y-px" />
              </span>
            </button>

            {/* Content */}
            <div
              className={`
                grid w-full min-w-0 transition-all duration-300 ease-out
                ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
              `}
            >
              <div className={`overflow-hidden px-6 min-w-0 ${open ? "pb-6" : "pb-0"}`}>
                <div className="text-lg text-brand-wine/80 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

