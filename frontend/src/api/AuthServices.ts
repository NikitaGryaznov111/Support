import axios from 'axios';
import { TypeUser } from '../utils/types';
export default class AuthServices {
  static async getUsers(): Promise<TypeUser[]> {
    return await axios
      .get('http://localhost:5000/api/users')
      .then((res) => res.data);
  }
  static async registerUser(user: { email: string; password: string }) {
    return await axios.post('http://localhost:5000/api/registration', user);
  }
}
