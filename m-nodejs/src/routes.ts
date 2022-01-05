import { Router } from 'express';
import CreateUserController from './controllers/CreateUserController';

const userController = new CreateUserController();

const routes = Router();

routes.post('/users', userController.handle);

export default routes;