import {
  EASING,
  TRANSITION_TIME2,
  TRANSITION_TIME_IN_MS,
} from "../../utils/constants";

import { useState } from "react";

export default function EnvelopeIntro({ onFinish, onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    if (onOpen) {
      onOpen();
    }
    setTimeout(() => onFinish?.(), TRANSITION_TIME_IN_MS);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        style={{
          transitionDuration: TRANSITION_TIME2,
          transitionTimingFunction: EASING,
        }}
        className={`
          absolute bottom-0 left-0 w-full h-1/2
          bg-[#f1ede6]
          transition-all
          ${opening ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        `}
      />

      <div
        style={{
          transitionDuration: TRANSITION_TIME2,
          transitionTimingFunction: EASING,
        }}
        className={`
          absolute top-0 left-0 w-full h-1/2
          bg-[#f8f5f0]
          shadow-[0_8px_20px_rgba(0,0,0,0.15)]
          transition-all
          ${opening ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        `}
      />

      {!opening && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Abrir invitación"
            className="
              overflow-hidden
              transition-transform duration-300 ease-out
              hover:scale-105
              active:scale-95
            "
          >
            <img
              src="/images/og-image.png"
              alt="Abrir invitación"
              className="w-55 sm:w-70 h-auto object-cover"
            />
          </button>
        </div>
      )}
    </div>
  );
}



