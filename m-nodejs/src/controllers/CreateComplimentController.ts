import { Request, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';

class CreateComplimentController {

    async handle(request: Request, response: Response) {
        const { 
            user_sender,
            user_receiver,
            tag_id,
            message
        }  = request.body;

        const createCompliment = new CreateComplimentService();

        const compliment = await createCompliment.execute({
            user_sender,
            user_receiver,
            tag_id,
            message
        });

        return response.status(200).json(compliment);
    }

}

export default CreateComplimentController;