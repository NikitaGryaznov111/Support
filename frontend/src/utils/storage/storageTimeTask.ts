import localforage from 'localforage';
import { TypeTask, TypeTime } from '../types';

export abstract class StorageTimeTask {
  static async addTime(
    newTime: TypeTime,
    taskId: TypeTime['taskId']
  ): Promise<void> {
    const timeStorage = await localforage.getItem<TypeTime[]>('time');

    if (timeStorage) {
      const index = timeStorage?.findIndex((el) => el.taskId === taskId);
      if (index > -1) {
        timeStorage[index] = newTime;
      } else {
        timeStorage.push(newTime);
      }
      await localforage.setItem('time', timeStorage);
    } else {
      await localforage.setItem('time', [newTime]);
    }
  }
  static async addTimeFromProject(
    newTime: TypeTime,
    taskId: TypeTime['taskId']
  ): Promise<void> {
    const timeStorage = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    if (timeStorage?.length === 0) {
      await localforage.setItem('timeFromProject', [newTime]);
    }
    if (timeStorage) {
      for (let i = 0; i < timeStorage!.length; i++) {
        if (timeStorage![i].taskId === taskId) {
          timeStorage!.splice(i, 1, newTime);
          await localforage.setItem('timeFromProject', timeStorage);
          break;
        } else {
          const time = timeStorage.find((el) => el.taskId === taskId);
          if (time) {
            await localforage.setItem('timeFromProject', [...timeStorage!]);
          } else {
            await localforage.setItem('timeFromProject', [
              ...timeStorage!,
              newTime,
            ]);
          }
        }
      }
    } else {
      await localforage.setItem('timeFromProject', [newTime]);
    }
  }
  static async getTime(taskId: TypeTime['taskId']): Promise<TypeTime> {
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    const initialTime: TypeTime = {
      totalSeconds: 0,
      taskId,
    };
    try {
      if (!timeStorage || timeStorage!.length === 0) {
        return initialTime;
      } else {
        const time = timeStorage.find((time: TypeTime): boolean => {
          return time.taskId === taskId;
        });
        return time || initialTime;
      }
    } catch (err) {
      throw new Error(`Ошибка времени:${err}`);
    }
  }

  static async getTimeFromProject(
    taskId: TypeTime['taskId']
  ): Promise<TypeTime> {
    const timeStorage = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    const initialTime: TypeTime = {
      totalSeconds: 0,
      taskId,
    };
    try {
      if (!timeStorage || timeStorage!.length === 0) {
        return initialTime;
      } else {
        const time = timeStorage.find((time: TypeTime): boolean => {
          return time.taskId === taskId;
        });
        return time || initialTime;
      }
    } catch (err) {
      throw new Error(`Ошибка:${err}`);
    }
  }
  static async deletedTime(
    taskId: TypeTime['taskId'],
    projectId?: TypeTime['projectId']
  ): Promise<void> {
    const timeStorageFromProject = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    const timeStorage = await localforage.getItem<TypeTime[]>('time');

    if (projectId && timeStorageFromProject) {
      const tasks = timeStorageFromProject!.filter(
        (time) => time.taskId !== taskId
      );
      localforage.setItem('timeFromProject', tasks);
    } else if (!projectId && timeStorage) {
      const tasks = timeStorage!.filter((time) => time.taskId !== taskId);
      localforage.setItem('time', tasks);
    }
  }
  static async getFullTimeUser(userId: TypeTask['id']): Promise<TypeTime[]> {
    const tasksStorage = await localforage.getItem<TypeTask[]>('tasks');
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    const tasks = tasksStorage!.filter((task) => task.id === userId);
    const fullTimeForTheUser: TypeTime[] = [];
    if (timeStorage) {
      for (let i = 0; i < tasks.length; i++) {
        timeStorage!.map((time) => {
          if (tasks[i].taskId === time.taskId) fullTimeForTheUser.push(time);
        });
      }
    }

    return fullTimeForTheUser;
  }
}
