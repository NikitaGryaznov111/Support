import { useRef, useState } from 'react';

interface UseTimerResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  setTimeFromTotal: (total: number) => void;
  isRunning: boolean;
}

const useTimer = (): UseTimerResult => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timeRef = useRef<number>(0);

  const tick = () => {
    setTotalSeconds((prev) => prev + 1);
  };
  const startTimer = () => {
    if (timeRef.current) return;
    timeRef.current = setInterval(tick, 1000);
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = 0;
    }
    setIsRunning(false);
  };

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const setTimeFromTotal = (newTotal: number) => {
    setTotalSeconds(newTotal);
  };

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    startTimer,
    stopTimer,
    setTimeFromTotal,
    isRunning,
  };
};

export default useTimer;
