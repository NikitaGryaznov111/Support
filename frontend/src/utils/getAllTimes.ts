import { TypeTime } from './types';
export const getAllTimes = (arrTimes: TypeTime[]) => {
  const totalTime = arrTimes.reduce(
    (acc, curr) => {
      return {
        hours: acc.hours + curr.hours,
        minutes: acc.minutes + curr.minutes,
        seconds: acc.seconds + curr.seconds,
      };
    },
    { hours: 0, minutes: 0, seconds: 0 }
  );
  return transformTime(totalTime);
};
const transformTime = (time: TypeTime): TypeTime => {
  return {
    hours: Math.floor(time.hours + time.minutes / 60 + time.seconds / 3600),
    minutes: Math.floor(time.minutes + time.seconds / 60) % 60,
    seconds: time.seconds % 60,
  };
};
