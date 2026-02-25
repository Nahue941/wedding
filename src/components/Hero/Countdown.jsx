import { useCountdown } from "../../hooks/useCountdown";

export default function Countdown({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  if (!timeLeft) {
    return (
      <h3 className="text-lg sm:text-xl font-light opacity-80">
        ¡Hoy es el gran día!
      </h3>
    );
  }

  return (
    <h3 className="text-lg sm:text-xl font-light opacity-80">
      {timeLeft.days} días {timeLeft.hours} horas {timeLeft.minutes} minutos{" "}
      {timeLeft.seconds} segundos
    </h3>
  );
}
