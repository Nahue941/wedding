import { useState } from "react";

import BingoGrid from "./BingoGrid";
import { bingoColumns } from "./bingoData";

const STORAGE_KEY = "bingo_invitados_answers";

function loadStoredAnswers() {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    // Ignore malformed/blocked storage; the game still works in-memory.
    return {};
  }
}

/**
 * Guest Bingo ("Bingo de Invitados").
 *
 * Guests walk around the wedding, find someone who matches each statement,
 * and write down that person's name. Names are not validated — whatever the
 * guest types is recorded as-is. Answers persist to localStorage so a guest
 * doesn't lose progress on an accidental refresh.
 */
export default function GuestBingo() {
  const [answers, setAnswers] = useState(loadStoredAnswers);

  function handleAnswerChange(cellKey, name) {
    setAnswers((prev) => {
      const next = { ...prev, [cellKey]: name };
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage errors (private mode, quota, etc.).
        }
      }
      return next;
    });
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto">
      <h1 className="font-parisienne text-4xl sm:text-5xl text-center mb-4">
        Bingo de Invitados
      </h1>

      <p className="text-lg sm:text-xl text-center leading-relaxed mb-6 px-1">
        Encontrá al invitado que cumple con esta afirmación y anotá su
        nombre. Cuando llenes el bingo mostráselos a los novios para que lo
        validen, mucha suerte y a conocerse
      </p>

      <BingoGrid
        columns={bingoColumns}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
    </div>
  );
}
