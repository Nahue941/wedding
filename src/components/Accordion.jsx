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
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              className="
                w-full flex items-center justify-between
                px-6 py-5
                text-left
                text-lg font-medium
                text-[#9c7446]
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
                ▼
              </span>
            </button>

            {/* Content */}
            <div
              className={`
                grid transition-all duration-300 ease-out
                ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
              `}
            >
              <div className="overflow-hidden px-6 pb-6">
                <div className="text-sm text-[#6b6b6b] leading-relaxed">
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
