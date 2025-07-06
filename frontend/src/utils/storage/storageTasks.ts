import localforage from 'localforage';
import { TypeTask } from '../types';

export abstract class StorageTasks {
  static async addTasks(newTask: TypeTask): Promise<void> {
    const tasksStorage = await localforage.getItem<TypeTask[]>('tasks');

    if (tasksStorage) {
      await localforage.setItem('tasks', [...tasksStorage, newTask]);
    } else {
      await localforage.setItem('tasks', [newTask]);
    }
  }

  static async getTasksUser(userId: TypeTask['id']): Promise<TypeTask[]> {
    const tasksStorage = await localforage.getItem<TypeTask[]>('tasks');
    if (!tasksStorage) return [];
    else {
      const tasks = tasksStorage.filter((task) => task.id === userId);
      return tasks;
    }
  }
  static async getTask(
    taskId: TypeTask['taskId']
  ): Promise<TypeTask | undefined> {
    const tasksStorage = await localforage.getItem<TypeTask[]>('tasks');
    const task = tasksStorage!.find((task: TypeTask): boolean => {
      return task.taskId === taskId;
    });
    return task;
  }
  static async deletedTask(taskId: TypeTask['taskId']) {
    const tasksStorage = await localforage.getItem<TypeTask[]>('tasks');
    const tasks = tasksStorage!.filter((task) => task.taskId !== taskId);
    localforage.setItem('tasks', tasks);
  }
  static async updateTask(
    taskId: TypeTask['taskId'],
    updates: TypeTask
  ): Promise<TypeTask | undefined> {
    const tasksStorage = await localforage.getItem<TypeTask[]>('tasks');
    const task = tasksStorage!.find((task: TypeTask): boolean => {
      return task.taskId === taskId;
    });
    Object.assign(task as TypeTask, updates);
    await localforage.setItem('tasks', tasksStorage);
    return task;
  }
}
