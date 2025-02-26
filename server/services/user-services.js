import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import UserModel from '../models/user-models.js';
import TokenService from './token-services.js';
import { UserDto } from '../dto/user-dto.js';
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
      const userDto = new UserDto(user);
      const token = TokenService.generateTokens({ ...userDto });
      return {
        ...token,
        user: userDto,
      };
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
