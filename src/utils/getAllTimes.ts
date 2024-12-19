import { TypeTime } from '../components/pages/TaskPage/TaskPage';

export const getAllTimes = (arrTimes: TypeTime[]): any => {
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
// разберись с hours, чтобы не обнулялся
const transformTime = (time: TypeTime): any => {
  return {
    hours: Math.floor(time.seconds / 3600),
    minutes: Math.floor((time.minutes * 60 + (time.seconds % 3600)) / 60),
    seconds: time.seconds % 60,
  };
};
