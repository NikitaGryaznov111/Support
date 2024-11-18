import axios from 'axios';

export type TypeUser = Partial<{
  id: string;
  name: string;
  email: string;
  adress: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}>;
async function getUsers(): Promise<TypeUser[]> {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export default getUsers;
