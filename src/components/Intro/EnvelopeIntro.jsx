import {
  EASING,
  TRANSITION_TIME2,
  TRANSITION_TIME_IN_MS,
} from "../../utils/constants";

import { useState } from "react";

export default function EnvelopeIntro({ onFinish }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onFinish(), TRANSITION_TIME_IN_MS);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Rectángulo inferior */}
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

      {/* Rectángulo superior */}
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

      {/* Botón */}
      {!opening && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleOpen}
            className="
              px-8 py-4
              bg-black text-white
              rounded-full
              tracking-widest
              text-sm
              shadow-lg
              active:scale-95
              transition
            "
          >
            Abrir invitación
          </button>
        </div>
      )}
    </div>
  );
}
