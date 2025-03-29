import localforage from 'localforage';
import { TypeProject, TypeTask, TypeTime } from './types';

export abstract class StorageTasks {
  static async getTasksStorage(): Promise<TypeTask[] | null> {
    return await localforage.getItem('tasks');
  }
  static async addTasks(newTask: TypeTask): Promise<void> {
    const tasks = await this.getTasksStorage();

    if (tasks) {
      await localforage.setItem('tasks', [...tasks, newTask]);
    } else {
      await localforage.setItem('tasks', [newTask]);
    }
  }

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
// разберись со временем!
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

export abstract class StorageProjects {
  static async getProjects(): Promise<TypeProject[]> {
    return (await localforage.getItem('projects')) as TypeProject[];
  }
  static async addProject(project: TypeProject): Promise<void> {
    const projects = await this.getProjects();

    if (projects) {
      await localforage.setItem('projects', [...projects, project]);
    } else {
      await localforage.setItem('projects', [project]);
    }
  }
  static async getProject(projectId: string): Promise<TypeProject> {
    const projects = await this.getProjects();
    const project = projects.find((project) => project.projectId === projectId);
    return project as TypeProject;
  }
  static async getTask(projectId: string, taskId: string): Promise<TypeTask> {
    const project = await this.getProject(projectId);
    const { tasks } = project;
    const task = tasks.find((task) => task.taskId === taskId);
    return task as TypeTask;
  }
  static async updateTask(
    taskId: string,
    projectId: string,
    updates: TypeTask
  ): Promise<TypeTask | undefined> {
    const projects = await this.getProjects();
    const project = projects.find((project) => project.projectId === projectId);
    const { tasks } = project as TypeProject;

    const task = tasks.find((task) => task.taskId === taskId);
    Object.assign(task!, updates);
    await localforage.setItem('projects', projects);
    return task;
  }
}
