import { Router } from 'express';
import { ensureAdmin } from './middlewares/ensureAdmin';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import AuthenticateUserController from './controllers/AuthenticateUserController';

const userController = new CreateUserController();
const tagsController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController()

const routes = Router();

routes.post('/users', userController.handle);
routes.post('/tags', ensureAdmin, tagsController.handle);
routes.post('/sessions', authenticateUserController.handle);

export default routes;