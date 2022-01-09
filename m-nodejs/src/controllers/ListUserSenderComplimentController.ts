import { Request, Response } from 'express';
import ListUserSenderComplimentsService from '../services/ListUserSenderComplimentsService';

class ListUserSenderComplimentController {

    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listUserSenderCompliments = new ListUserSenderComplimentsService();

        const compliments = await listUserSenderCompliments.execute(user_id);

        response.status(200).json(compliments);
    }

}

export default ListUserSenderComplimentController;