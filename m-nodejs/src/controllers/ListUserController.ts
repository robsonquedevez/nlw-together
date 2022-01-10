import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';

class ListUserController {

    async handle(request: Request, response: Response) {

        const listUser = new ListUserService();

        const users = await listUser.execute();

        response.status(200).json(users);
    }

}

export default ListUserController;