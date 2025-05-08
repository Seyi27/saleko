import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

interface CountdownTimerProps {
  // dateFrom: string;
  dateTo: string | null;
}

const CountdownTimer = ({ dateTo }: CountdownTimerProps) => {
  const parseLocalDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // Local time
  };

  const calculateTimeLeft = () => {
    if (!dateTo) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const now = new Date().getTime();
    const targetDate = parseLocalDate(dateTo).getTime();
    const difference = Math.max(targetDate - now, 0);

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTo]);

  return (
    <div className="timer_container">
      <div className="timer">{timeLeft.days}d</div>
      <div className="timer">{timeLeft.hours}h</div>
      <div className="timer">{timeLeft.minutes}m</div>
      <div className="timer">{timeLeft.seconds}s</div>
      <p>Remains until the end of the offer</p>
    </div>
  );
};

export default CountdownTimer;
