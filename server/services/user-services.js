import UserModel from '../models/user-models.js';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

class UserServices {
  async registration(email, password) {
    try {
      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        throw new Error(`Пользователь с таким ${email} уже существует`);
      }
      const hashedPassword = await bcrypt.hash(password, 3);
      const userId = nanoid(6);
      const user = await UserModel.create({
        userId,
        email,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new Error('Ошибка в сервисе пользователя');
    }
  }
  async login(email, password) {
    try {
    } catch (error) {}
  }
  async getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error('Ошибка при получении списка пользователей');
    }
  }
}

export default new UserServices();
