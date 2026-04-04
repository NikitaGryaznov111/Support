import axios from 'axios';

export const registerUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  return await axios.post('http://localhost:5000/api/registration', user);
};
