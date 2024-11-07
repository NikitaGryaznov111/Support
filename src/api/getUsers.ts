import axios from 'axios';

export type User = {
  id: string;
  name: string;
  email: string;
  adress?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};
async function getUsers(): Promise<User[]> {
  const URL = 'https://jsonplaceholder.typicode.com/users';
  const { data } = await axios.get(URL);
  return data;
}

export default getUsers;
