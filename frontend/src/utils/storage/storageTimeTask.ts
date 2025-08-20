import localforage from 'localforage';
import { TypeTask, TypeTime } from '../types';
import { upsertTimeEntry } from './storage.helpers';
import { StorageProjects } from './storageProjects';

export abstract class StorageTimeTask {
  static async addTime(newTime: TypeTime, taskId: string): Promise<void> {
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    const timeStorageFromProject = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    const { projectId } = newTime;
    if (!projectId) {
      upsertTimeEntry(timeStorage, 'time', newTime, taskId);
    } else {
      upsertTimeEntry(
        timeStorageFromProject,
        'timeFromProject',
        newTime,
        taskId
      );
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
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    if (!timeStorage) {
      return [];
    }
    const timeTasksUser = timeStorage.filter((time) => time.userId === userId);
    return timeTasksUser;
  }

  static async delTimeWhenDelProject(projectId: string): Promise<void> {
    const project = await StorageProjects.getProject(projectId);
    const { tasks } = project;
    const timeStorage = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    const taskId = tasks.map((task) => task.taskId);
    const newTimeStorage = timeStorage?.filter(
      (time) => !taskId.includes(time.taskId)
    );
    localforage.setItem('timeFromProject', newTimeStorage);
  }
}
