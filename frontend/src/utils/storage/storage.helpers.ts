import localforage from 'localforage';
import { TypeTime, TypeTotalSeconds } from '../../types/types';

export const helperTimeUpdate = async (
  storage: TypeTime[] | TypeTotalSeconds[],
  storeKey: string,
  newTime: TypeTime | TypeTotalSeconds,
  taskId: string,
): Promise<void> => {
  if (storage) {
    const index = storage.findIndex((el) => el.taskId === taskId);
    if (index > -1) {
      storage[index] = newTime;
    } else {
      storage.push(newTime);
    }
    await localforage.setItem(storeKey, storage);
  } else {
    await localforage.setItem(storeKey, [newTime]);
  }
};

export const helperAddStartTime = async (
  storage: TypeTime[],
  taskId: string,
  timeStart: number,
  storeKey: string,
) => {
  const newTimeStorage = storage.map((time) => {
    if (time.taskId === taskId) {
      return {
        ...time,
        timeStart: timeStart / 1000,
      };
    }
    return time;
  });
  localforage.setItem(storeKey, newTimeStorage);
};

export const helperResetStartTime = async (
  storage: TypeTime[],
  taskId: string,
  storeKey: string,
) => {
  const newTimeStorage = storage.map((time) => {
    if (time.taskId === taskId) {
      return {
        ...time,
        timeStart: 0,
      };
    }
    return time;
  });
  localforage.setItem(storeKey, newTimeStorage);
};

export const helperFindStartTime = async (
  storage: TypeTime[],
  taskId: string,
): Promise<number> => {
  const time = storage.find((time: TypeTime): boolean => {
    return time.taskId === taskId;
  });
  const timeStart = time?.timeStart;
  if (!timeStart) {
    return 0;
  }
  return timeStart;
};

export const helperFindTotalSeconds = async (
  storage: TypeTime[],
  taskId: string,
): Promise<number> => {
  const time = storage!.find((el) => el.taskId === taskId);
  if (!time) return 0;
  const totalSeconds = time.totalSeconds;
  return totalSeconds;
};
