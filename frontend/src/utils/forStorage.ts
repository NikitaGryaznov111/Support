import getUsers from '../api/getUsers';
import localforage from 'localforage';
import { TypeTask, TypeTaskUpdate, TypeTime, TypeUser } from './types';
export const getUsersStorage = async (): Promise<TypeUser[]> => {
  const usersStorage = (await localforage.getItem('users')) as TypeUser[];
  return usersStorage;
};

export const addUsersStorage = () => {
  getUsers().then((users) => localforage.setItem('users', users));
};

export const getUserStorage = async (
  userId: TypeUser['id']
): Promise<TypeUser | undefined> => {
  const usersStorage = (await localforage.getItem('users')) as TypeUser[];
  const user = usersStorage.find((person: TypeUser): boolean => {
    return Number(person.id) === Number(userId);
  });
  return user;
};
let arrayTasksStorage: TypeTask[] | any[] = [];

export const addTasksStorage = async (
  newTask: TypeTask,
  tasks?: TypeTask[]
) => {
  if (!tasks) {
    arrayTasksStorage.push(newTask);
    await localforage.setItem('tasks', arrayTasksStorage);
    return;
  }
  arrayTasksStorage = [...tasks, newTask];
  await localforage.setItem('tasks', arrayTasksStorage);
};
export const getAllTasksStorage = async (): Promise<TypeTask[]> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  return tasksStorage;
};

export const getTasksUserStorage = async (
  userId: TypeTask['id']
): Promise<TypeTask[]> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const tasks = tasksStorage.filter((task) => task.id === userId);
  return tasks;
};

export const getTaskStorage = async (
  taskId: TypeTask['taskId']
): Promise<TypeTask> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const task = tasksStorage.find((task: TypeTask): boolean => {
    return task.taskId === taskId;
  });
  return task as TypeTask;
};

export const deletedTaskStorage = async (taskId: TypeTask['taskId']) => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const tasks = tasksStorage.filter((task) => task.taskId !== taskId);
  localforage.setItem('tasks', tasks);
};

export const updateTaskStorage = async (
  taskId: TypeTask['taskId'],
  updates: TypeTaskUpdate
): Promise<TypeTask | undefined> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const task = tasksStorage.find((task: TypeTask): boolean => {
    return task.taskId === taskId;
  });
  Object.assign(task as TypeTask, updates);
  await localforage.setItem('tasks', tasksStorage);
  return task;
};

const arrayTimes: TypeTime[] = [];

export const addTimeStorage = async (
  newTime: TypeTime,
  taskId: TypeTime['taskId']
) => {
  if (arrayTimes.length > 0) {
    const timeStorage = (await localforage.getItem('time')) as TypeTime[];
    for (let i = 0; i < timeStorage.length; i++) {
      if (timeStorage[i].taskId === taskId) {
        timeStorage.splice(i, 1, newTime);
        await localforage.setItem('time', timeStorage);
        break;
      } else if (timeStorage[i].taskId !== taskId && newTime.minutes !== 3) {
        await localforage.setItem('time', [...timeStorage, newTime]);
      }
    }
  } else {
    arrayTimes.push(newTime);
    await localforage.setItem('time', arrayTimes);
  }
};

export const getTimeStorage = async (taskId: TypeTime['taskId']) => {
  const timeStorage: TypeTime[] | null = await localforage.getItem('time');
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
};

export const deletedTimeStorage = async (taskId: string) => {
  const timeStorage = (await localforage.getItem('time')) as TypeTime[];
  if (timeStorage) {
    const tasks = timeStorage.filter((time) => time.taskId !== taskId);
    localforage.setItem('time', tasks);
  }
};

export const getAllTimesTasksStorage = async (
  userId: TypeTask['id']
): Promise<TypeTime[]> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const timeStorage = (await localforage.getItem('time')) as TypeTime[];
  const tasks = tasksStorage.filter((task) => task.id === userId);
  let fullTimeForTheUser: TypeTime[] = [];

  for (let i = 0; i < tasks.length; i++) {
    timeStorage.map((time) => {
      if (tasks[i].taskId === time.taskId) fullTimeForTheUser.push(time);
    });
  }
  return fullTimeForTheUser;
};
