import axios from 'axios';

export const loginUser = async (user: { name: string; password: string }) => {
  return await axios.post('http://localhost:5000/api/login', user);
};
