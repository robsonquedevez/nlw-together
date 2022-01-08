import { Router } from 'express';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import CreateComplimentController from './controllers/CreateComplimentController';

const userController = new CreateUserController();
const tagsController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const routes = Router();

routes.post('/users', userController.handle);
routes.post('/tags', ensureAuthenticate, ensureAdmin, tagsController.handle);
routes.post('/compliments', ensureAuthenticate, createComplimentController.handle);
routes.post('/sessions', authenticateUserController.handle);

export default routes;