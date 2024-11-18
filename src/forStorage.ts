import getUsers, { TypeUser } from './api/getUsers';
import localforage from 'localforage';
import { TypeTask } from './components/smart/FormTasks/FormTasks';
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
