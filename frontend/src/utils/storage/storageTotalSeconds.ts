import localforage from 'localforage';
import { TypeTime, TypeTotalSeconds } from '../types';
import {
  helperTimeUpdate,
  helperAddStartTime,
  helperResetStartTime,
  helperFindStartTime,
  helperFindTotalSeconds,
} from './storage.helpers';

// ПОДУЙМАЙ ГДЕ ЕЩЕ ИСПОЛЬЗОВАТЬ helperы

export abstract class StorageTotalSeconds {
  static async addStartTime(timeStart: number, taskId: string): Promise<void> {
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    await helperAddStartTime(timeStorage!, taskId, timeStart, 'time');
  }
  static async addStartTimeFromProject(
    timeStart: number,
    taskId: string
  ): Promise<void> {
    const timeStorageFromProject = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    await helperAddStartTime(
      timeStorageFromProject!,
      taskId,
      timeStart,
      'timeFromProject'
    );
  }
  static async resetStartTime(taskId: string): Promise<void> {
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    await helperResetStartTime(timeStorage!, taskId, 'time');
  }
  static async resetStartTimeFromProject(taskId: string): Promise<void> {
    const timeStorageFromProject = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    await helperResetStartTime(
      timeStorageFromProject!,
      taskId,
      'timeFromProject'
    );
  }
  static async findStartTime(taskId: string): Promise<number | undefined> {
    const timeStorage = await localforage.getItem<TypeTime[]>('time');
    if (!timeStorage) return;
    return await helperFindStartTime(timeStorage, taskId);
  }
  static async findStartTimeFromProject(
    taskId: string
  ): Promise<number | undefined> {
    const timeStorageFromProject = await localforage.getItem<TypeTime[]>(
      'timeFromProject'
    );
    if (!timeStorageFromProject) return;
    return await helperFindStartTime(timeStorageFromProject, taskId);
  }

  static async saveTotalSeconds(data: TypeTotalSeconds): Promise<void> {
    const totalSecondsStorage = await localforage.getItem<TypeTotalSeconds[]>(
      'totalSeconds'
    );
    const totalSecondsStorageFromProject = await localforage.getItem<
      TypeTotalSeconds[]
    >('totalSecondsFromProject');
    const { taskId, projectId } = data;
    if (!projectId) {
      await helperTimeUpdate(
        totalSecondsStorage!,
        'totalSeconds',
        data,
        taskId!
      );
    } else {
      await helperTimeUpdate(
        totalSecondsStorageFromProject!,
        'totalSecondsFromProject',
        data,
        taskId!
      );
    }
  }
  static async findTotalSeconds(
    taskId: string,
    projectId: string
  ): Promise<number> {
    const totalSecondsStorage = await localforage.getItem<TypeTotalSeconds[]>(
      'totalSeconds'
    );
    const totalSecondsStorageFromProject = await localforage.getItem<
      TypeTotalSeconds[]
    >('totalSecondsFromProject');

    if (!projectId) {
      return !totalSecondsStorage
        ? 0
        : helperFindTotalSeconds(totalSecondsStorage, taskId);
    } else {
      return !totalSecondsStorageFromProject
        ? 0
        : helperFindTotalSeconds(totalSecondsStorageFromProject, taskId);
    }
  }
}
