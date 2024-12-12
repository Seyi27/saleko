import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

interface CountdownTimerProps {
  targetDate: string; // Target date in ISO format (e.g., "2024-12-31T23:59:59")
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [targetDate]);

  return (
    <div className="timer_container">
      <div className="timer">{timeLeft.days}</div>
      <div className="timer">{timeLeft.hours}</div>
      <div className="timer">{timeLeft.minutes}</div>
      <div>:</div>
      <div className="timer">{timeLeft.seconds}</div>
      <p>Remains until the end of the offer</p>
    </div>
  );
};

export default CountdownTimer;
