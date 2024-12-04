import getUsers, { TypeUser } from './api/getUsers';
import localforage from 'localforage';
import { TypeTask } from './components/smart/FormTasks/FormTasks';
import { TypeTaskUpdate } from './components/pages/EditTaskPage/EditTaskPage';
import { TypeTime } from './components/pages/TaskPage/TaskPage';
export const getUsersStorage = async (): Promise<TypeUser[]> => {
  const usersStorage = (await localforage.getItem('users')) as TypeUser[];
  return usersStorage;
};

export const addUsersStorage = () => {
  getUsers().then((users) => localforage.setItem('users', users));
};

export const getUserStorage = async (
  id: TypeUser['id']
): Promise<TypeUser | undefined> => {
  const usersStorage = (await localforage.getItem('users')) as TypeUser[];
  const user = usersStorage.find((person: TypeUser): boolean => {
    return Number(person.id) === Number(id);
  });
  return user;
};
let arrayTasksStorage: TypeTask[] | any[] = [];

export const addTasksStorage = (input: TypeTask, tasks?: TypeTask[]) => {
  if (!tasks) {
    arrayTasksStorage.push(input);
    localforage.setItem('tasks', arrayTasksStorage);
    return;
  }
  arrayTasksStorage = [...tasks, input];
  localforage.setItem('tasks', arrayTasksStorage);
};

export const getTasksStorage = async (): Promise<TypeTask[]> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  return tasksStorage;
};

export const getTaskStorage = async (
  taskId: TypeTask['nanoId']
): Promise<TypeTask> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const task = tasksStorage.find((task: TypeTask): boolean => {
    return task.nanoId === taskId;
  });
  return task as TypeTask;
};

export const deletedTasksStorage = async (nanoId: TypeTask['nanoId']) => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const tasks = tasksStorage.filter((task) => task.nanoId !== nanoId);
  localforage.setItem('tasks', tasks);
};

export const updateTaskStorage = async (
  taskId: TypeTask['nanoId'],
  updates: TypeTaskUpdate
): Promise<TypeTask | undefined> => {
  const tasksStorage = (await localforage.getItem('tasks')) as TypeTask[];
  const task = tasksStorage.find((task: TypeTask): boolean => {
    return task.nanoId === taskId;
  });
  Object.assign(task as TypeTask, updates);
  await localforage.setItem('tasks', tasksStorage);
  return task;
};
const arrayTimeTask: TypeTime[] = [];

export const addTimeStorage = async (
  newTime: TypeTime,
  taskId: TypeTime['taskId']
) => {
  if (arrayTimeTask.length > 0) {
    const timeStorage = (await localforage.getItem('time')) as TypeTime[];
    for (let i = 0; i < timeStorage.length; i++) {
      if (timeStorage[i].taskId === taskId) {
        timeStorage.splice(i, 1, newTime);
        await localforage.setItem('time', timeStorage);
      } else {
        // надо как-то выйти из цикла
        const localArr = [];

        localArr.push(newTime);
        const elem = localArr.find((x) => x.taskId === taskId);
        Object.assign(elem as any, newTime);
        await localforage.setItem('time', [...timeStorage, ...localArr]);
      }
    }
  } else {
    arrayTimeTask.push(newTime);
    await localforage.setItem('time', arrayTimeTask);
  }
};

// export const getTimeStorage = async (taskId: TypeTime['taskId']) => {
//   const timeStorage = (await localforage.getItem('time')) as TypeTime[];
//   // const time = timeStorage.find((time: TypeTime): boolean => {
//   //   return time.taskId === taskId;
//   // });
//   // return time as TypeTime;
//   return timeStorage;
// };
