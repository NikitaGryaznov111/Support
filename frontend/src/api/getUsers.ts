import axios from 'axios';
import { TypeUser } from '../utils/types';

const getUsers = async (): Promise<TypeUser[]> => {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get<TypeUser[]>(URL);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default getUsers;
