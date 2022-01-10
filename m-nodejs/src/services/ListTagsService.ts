import { getCustomRepository } from 'typeorm';
import TagsRepositories from '../repositories/TagsRepositories';
import { instanceToPlain } from 'class-transformer';

class ListTagsService {

    async execute() {

        const tagRepository = getCustomRepository(TagsRepositories);

        const tags = await tagRepository.find();

        return instanceToPlain(tags);
    }

}

export default ListTagsService;