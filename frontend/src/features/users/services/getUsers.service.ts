import { TypeUser } from '@/types/types';
import axios from 'axios';

export const getUsers = async (): Promise<TypeUser[]> => {
  return (await axios('http://localhost:5000/api/users')).data;
};
