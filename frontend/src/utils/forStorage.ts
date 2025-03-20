import localforage from 'localforage';
import { TypeTask, TypeTime } from './types';

export abstract class StorageTasks {
  static arrayTasksStorage: TypeTask[] | any[] = [];

  static async getTasksStorage(): Promise<TypeTask[] | null> {
    return await localforage.getItem('tasks');
  }
  static async addTasks(newTask: TypeTask, tasks: TypeTask[]): Promise<void> {
    if (!tasks) {
      this.arrayTasksStorage.push(newTask);
      await localforage.setItem('tasks', this.arrayTasksStorage);
      return;
    }
    this.arrayTasksStorage = [...tasks, newTask];
    await localforage.setItem('tasks', this.arrayTasksStorage);
  }
  // static async getAllTasks(): Promise<TypeTask[]> {
  //   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  //   return tasksStorage;
  // }
  static async getTasksUser(userId: TypeTask['id']): Promise<TypeTask[]> {
    const tasksStorage = await this.getTasksStorage();
    const tasks = tasksStorage!.filter((task) => task.id === userId);
    return tasks;
  }
  static async getTask(
    taskId: TypeTask['taskId']
  ): Promise<TypeTask | undefined> {
    const tasksStorage = await this.getTasksStorage();
    const task = tasksStorage!.find((task: TypeTask): boolean => {
      return task.taskId === taskId;
    });
    return task;
  }
  static async deletedTask(taskId: TypeTask['taskId']) {
    const tasksStorage = await this.getTasksStorage();
    const tasks = tasksStorage!.filter((task) => task.taskId !== taskId);
    localforage.setItem('tasks', tasks);
  }
  static async updateTask(
    taskId: TypeTask['taskId'],
    updates: TypeTask
  ): Promise<TypeTask | undefined> {
    const tasksStorage = await this.getTasksStorage();
    const task = tasksStorage!.find((task: TypeTask): boolean => {
      return task.taskId === taskId;
    });
    Object.assign(task as TypeTask, updates);
    await localforage.setItem('tasks', tasksStorage);
    return task;
  }
}

// export const addTasksStorage = async (
//   newTask: TypeTask,
//   tasks?: TypeTask[]
// ) => {
//   if (!tasks) {
//     arrayTasksStorage.push(newTask);
//     await localforage.setItem('tasks', arrayTasksStorage);
//     return;
//   }
//   arrayTasksStorage = [...tasks, newTask];
//   await localforage.setItem('tasks', arrayTasksStorage);
// };
// export const getAllTasksStorage = async (): Promise<TypeTask[]> => {
//   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
//   return tasksStorage;
// };

// export const getTasksUserStorage = async (
//   userId: TypeTask['id']
// ): Promise<TypeTask[]> => {
//   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
//   const tasks = tasksStorage.filter((task) => task.id === userId);
//   return tasks;
// };

// export const getTaskStorage = async (
//   taskId: TypeTask['taskId']
// ): Promise<TypeTask> => {
//   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
//   const task = tasksStorage.find((task: TypeTask): boolean => {
//     return task.taskId === taskId;
//   });
//   return task as TypeTask;
// };

// export const deletedTaskStorage = async (taskId: TypeTask['taskId']) => {
//   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
//   const tasks = tasksStorage.filter((task) => task.taskId !== taskId);
//   localforage.setItem('tasks', tasks);
// };

// export const updateTaskStorage = async (
//   taskId: TypeTask['taskId'],
//   updates: TypeTaskUpdate
// ): Promise<TypeTask | undefined> => {
//   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
//   const task = tasksStorage.find((task: TypeTask): boolean => {
//     return task.taskId === taskId;
//   });
//   Object.assign(task as TypeTask, updates);
//   await localforage.setItem('tasks', tasksStorage);
//   return task;
// };

export abstract class StorageTimeTask {
  static arrayTimes: TypeTime[] = [];
  static async getTimeStorage(): Promise<TypeTime[] | null> {
    return await localforage.getItem('time');
  }
  static async addTime(
    newTime: TypeTime,
    taskId: TypeTime['taskId']
  ): Promise<void> {
    if (this.arrayTimes.length > 0) {
      const timeStorage = await this.getTimeStorage();
      for (let i = 0; i < timeStorage!.length; i++) {
        if (timeStorage![i].taskId === taskId) {
          timeStorage!.splice(i, 1, newTime);
          await localforage.setItem('time', timeStorage);
          break;
        } else if (timeStorage![i].taskId !== taskId && newTime.minutes !== 3) {
          await localforage.setItem('time', [...timeStorage!, newTime]);
        }
      }
    } else {
      this.arrayTimes.push(newTime);
      await localforage.setItem('time', this.arrayTimes);
    }
  }
  static async getTime(
    taskId: TypeTime['taskId']
  ): Promise<TypeTime | undefined> {
    const timeStorage = await this.getTimeStorage();
    const initialTime: TypeTime = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      taskId,
    };
    try {
      if (!timeStorage) {
        return initialTime;
      } else {
        const time = timeStorage.find((time: TypeTime): boolean => {
          return time.taskId === taskId;
        });
        return time || initialTime;
      }
    } catch (err) {
      console.log('Error getTimeStorage: ', err);
    }
  }
  static async deletedTime(taskId: TypeTime['taskId']): Promise<void> {
    const timeStorage = await this.getTimeStorage();
    const tasks = timeStorage!.filter((time) => time.taskId !== taskId);
    localforage.setItem('time', tasks);
  }
  static async getFullTimeUser(userId: TypeTask['id']): Promise<TypeTime[]> {
    const tasksStorage = await StorageTasks.getTasksStorage();
    const timeStorage = await this.getTimeStorage();
    const tasks = tasksStorage!.filter((task) => task.id === userId);
    let fullTimeForTheUser: TypeTime[] = [];

    for (let i = 0; i < tasks.length; i++) {
      timeStorage!.map((time) => {
        if (tasks[i].taskId === time.taskId) fullTimeForTheUser.push(time);
      });
    }
    return fullTimeForTheUser;
  }
}

// export const getTimeStorage = async (taskId: TypeTime['taskId']) => {
//   const timeStorage: TypeTime[] | null = await localforage.getItem('time');
//   const initialTime: TypeTime = {
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     taskId,
//   };
//   try {
//     if (!timeStorage) {
//       return initialTime;
//     } else {
//       const time = timeStorage.find((time: TypeTime): boolean => {
//         return time.taskId === taskId;
//       });
//       return time || initialTime;
//     }
//   } catch (err) {
//     console.log('Error getTimeStorage: ', err);
//   }
// };

// export const deletedTimeStorage = async (taskId: string) => {
//   const timeStorage = (await localforage.getItem('time')) as TypeTime[];
//   if (timeStorage) {
//     const tasks = timeStorage.filter((time) => time.taskId !== taskId);
//     localforage.setItem('time', tasks);
//   }
// };

// export const getAllTimesTasksStorage = async (
//   userId: TypeTask['id']
// ): Promise<TypeTime[]> => {
//   const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
//   const timeStorage = (await localforage.getItem('time')) as TypeTime[];
//   const tasks = tasksStorage.filter((task) => task.id === userId);
//   let fullTimeForTheUser: TypeTime[] = [];

//   for (let i = 0; i < tasks.length; i++) {
//     timeStorage.map((time) => {
//       if (tasks[i].taskId === time.taskId) fullTimeForTheUser.push(time);
//     });
//   }
//   return fullTimeForTheUser;
// };
