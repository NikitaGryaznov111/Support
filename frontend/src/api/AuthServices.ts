import axios from 'axios';
import { TypeUser } from '../utils/types';
export default class AuthServices {
  static async getUsers(): Promise<TypeUser[]> {
    return await axios
      .get('http://localhost:5000/api/users')
      .then((res) => res.data)
      .catch((err) => console.error(`Ошибка получения пользователей - ${err}`));
  }

  static async registerUser(user: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      return await axios.post('http://localhost:5000/api/registration', user);
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  }

  static async login(user: { name: string; password: string }) {
    try {
      return await axios.post('http://localhost:5000/api/login', user);
    } catch (error) {
      console.error('Error login user:', error);
      return null;
    }
  }
}
