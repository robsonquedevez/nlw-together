import { Request, Response } from 'express';
import ListTagsService from '../services/ListTagsService';

class ListTagController {

    async handle(request: Request, response: Response) {

        const listTags = new ListTagsService();

        const tags  = await listTags.execute();

        response.status(200).json(tags);
    }

}

export default ListTagController;