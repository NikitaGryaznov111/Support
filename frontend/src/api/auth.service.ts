import axios from "axios";
export default class AuthServices {
  static async login(user: { name: string; password: string }) {
    try {
      return await axios.post("http://localhost:5000/api/login", user);
    } catch (error) {
      console.error("Error login user:", error);
      return null;
    }
  }
}
// TODO Это удали потом