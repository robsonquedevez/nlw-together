import { getCustomRepository } from 'typeorm';
import Compliment from '../entities/Compliments';
import ComplimentRepositories from '../repositories/ComplimentsRepositories';

class ListUserSenderComplimentsService {

    async execute(user_sender: string): Promise<Compliment[]> {

        const complimentRepository = getCustomRepository(ComplimentRepositories);

        const compliments = await complimentRepository.find({
            where: {
                user_sender
            },
            relations: ['userSender', 'userReceiver', 'tag']
        });

        if(!compliments) {
            throw new Error('Compliments not found')
        }

        return compliments
    }
}

export default ListUserSenderComplimentsService;