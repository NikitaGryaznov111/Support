// ТИПИЗИРУЙ!!!

import getUsers, { User } from './api/getUsers';
import localforage from 'localforage';

export const getUsersStorage = async () => {
  const usersStorage = await localforage.getItem('users');
  return usersStorage;
};

export const addUsersStorage = () => {
  getUsers().then((users) => localforage.setItem('users', users));
};

export const getUserStorage = async (id: User['id']) => {
  const usersStorage = (await localforage.getItem('users')) as User[];
  const user = usersStorage.find((person: User) => {
    return Number(person.id) === Number(id);
  });
  return user;
};
