import { getCustomRepository } from 'typeorm';
import TagsRepositories from '../repositories/TagsRepositories';
import Tag from '../entities/Tag';

class CreateTagService {

    async execute(name: string): Promise<Tag> {

        const tagsRepository = getCustomRepository(TagsRepositories);

        if(!name) {
            throw new Error("Incorrect name");
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            where: {
                name
            }
        });

        if(tagAlreadyExists) {
            throw new Error("Tag already exists");
        }

        const tag = tagsRepository.create({name});

        await tagsRepository.save(tag);

        return tag;
    }
}

export default CreateTagService;