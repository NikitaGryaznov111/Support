import { Router } from 'express';
import userControllers from '../controllers/user-controllers.js';
const router = new Router();

router.post('/registration', userControllers.registration);
router.post('/login', userControllers.login);
router.get('/users', userControllers.getUsers);
router.get('/user/:userId', userControllers.getUser);
export default router;
