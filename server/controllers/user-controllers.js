import userServices from '../services/user-services.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await userServices.registration(name, email, password);
      if (result === -1) {
        return res
          .status(404)
          .json({
            code: -1,
            message: 'Пользователь с таким именем уже существует',
          });
      }
      return res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
  async login(req, res, next) {
    try {
      const { name, password } = req.body;
      const result = await userServices.login(name, password);

      if (result === 0) {
        return res
          .status(404)
          .json({ code: 0, message: 'Пользователь с таким именем не найден' });
      }
      if (result === -1) {
        return res.status(401).json({ code: -1, message: 'Неверный пароль' });
      }

      return res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userServices.getUsers();
      return res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new UserController();
