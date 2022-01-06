import { Router } from 'express';
import { ensureAdmin } from './middlewares/ensureAdmin';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';

const userController = new CreateUserController();
const tagsController = new CreateTagController();

const routes = Router();

routes.post('/users', userController.handle);
routes.post('/tags', ensureAdmin, tagsController.handle);

export default routes;