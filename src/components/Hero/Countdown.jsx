import CountdownCard from "./CountDownCard";
import { useCountdown } from "@hooks/useCountdown";

export default function Countdown({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  if (!timeLeft) {
    return (
      <h3 className="text-lg sm:text-xl font-light text-brand-text/85">
        Hoy es el gran dia!
      </h3>
    );
  }

  return <CountdownCard time={timeLeft} />;
}
