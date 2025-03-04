import userServices from '../services/user-services.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await userServices.registration(name, email, password);
      return res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
  async login(req, res, next) {
    try {
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
  async getUser(req, res, next) {
    try {
      const users = await userServices.getUser();
      return res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new UserController();
