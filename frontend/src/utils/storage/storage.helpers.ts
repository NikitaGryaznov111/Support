import localforage from 'localforage';
import { TypeTime } from '../types';

export const upsertTimeEntry = async (
  storage: TypeTime[] | null,
  storeKey: string,
  newTime: TypeTime,
  taskId: string
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
