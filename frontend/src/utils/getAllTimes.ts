import { TypeTime } from './types';
export const getAllTimes = (arrTimes: TypeTime[]): number => {
  let sum = 0;
  for (let i = 0; i < arrTimes.length; i++) {
    sum += arrTimes[i].totalSeconds;
  }
  return sum;
};
