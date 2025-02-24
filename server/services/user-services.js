import UserModel from '../models/user-models.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

class UserServices {
  async registration(email, password) {
    try {
      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        throw new Error(`Пользователь с таким ${email} уже существует`);
      }
      const hashedPassword = await bcrypt.hash(password, 3);
      const userId = uuidv4();
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
}

export default new UserServices();
