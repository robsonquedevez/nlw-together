import { Request, Response } from 'express';
import ListUserReceiveComplimentsService from '../services/ListUserReceiveComplimentsService';

class ListUserReceiveComplimentController {

    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listUserReceiveCompliments = new ListUserReceiveComplimentsService();

        const compliments = await listUserReceiveCompliments.execute(user_id);

        response.status(200).json(compliments);
    }

}

export default ListUserReceiveComplimentController;