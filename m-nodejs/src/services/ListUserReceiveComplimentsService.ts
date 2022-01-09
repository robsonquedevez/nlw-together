import { getCustomRepository } from 'typeorm';
import Compliment from '../entities/Compliments';
import ComplimentRepositories from '../repositories/ComplimentsRepositories';

class ListUserReceiveComplimentsService {

    async execute(user_receiver: string): Promise<Compliment[]> {

        const complimentRepository = getCustomRepository(ComplimentRepositories);

        const compliments = await complimentRepository.find({
            where: {
                user_receiver
            },
            relations: ['userSender', 'userReceiver', 'tag']
        });

        if(!compliments) {
            throw new Error('Compliments not found')
        }

        return compliments
    }

}

export default ListUserReceiveComplimentsService;