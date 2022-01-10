import { Router } from 'express';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import CreateComplimentController from './controllers/CreateComplimentController';
import ListUserSenderComplimentController from './controllers/ListUserSenderComplimentController';
import ListUserReceiveComplimentController from './controllers/ListUserReceiveComplimentController';
import ListTagController from './controllers/ListTagController';
import ListUserController from './controllers/ListUserController';

const userController = new CreateUserController();
const tagsController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSenderCompliments = new ListUserSenderComplimentController();
const listUserReceiveCompliments = new ListUserReceiveComplimentController();
const listTagsController = new ListTagController();
const listUserController = new ListUserController();

const routes = Router();

routes.post(
    '/users', 
    userController.handle
);
routes.post(
    '/tags', 
    ensureAuthenticate, 
    ensureAdmin, 
    tagsController.handle
);
routes.post(
    '/compliments',
    ensureAuthenticate, 
    createComplimentController.handle
);
routes.post(
    '/sessions', 
    authenticateUserController.handle
);

routes.get(
    '/user/compliments/sender', 
    ensureAuthenticate, 
    listUserSenderCompliments.handle
);
routes.get(
    '/user/compliments/receive', 
    ensureAuthenticate, 
    listUserReceiveCompliments.handle
);
routes.get(
    '/tags',
    ensureAuthenticate,
    listTagsController.handle
);
routes.get(
    '/users',
    ensureAuthenticate,
    listUserController.handle
)

export default routes;