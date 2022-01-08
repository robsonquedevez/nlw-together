import { getCustomRepository } from "typeorm";
import Compliment from "../entities/Compliments";
import ComplimentsRepositories from '../repositories/ComplimentsRepositories';
import UserRespotories from '../repositories/UserRepositories';

interface IComplimentRequest {
    user_sender: string,
    user_receiver: string;
    tag_id: string;
    message: string;
}

class CreateComplimentService {
    
    async execute({ 
        user_sender,
        user_receiver,
        tag_id,
        message
    }: IComplimentRequest): Promise<Compliment> {

        const userRepository = getCustomRepository(UserRespotories);

        if(user_sender === user_receiver) {
            throw new Error('receiver user is equal sender user');
        }
        
        const userReceiverExists = await userRepository.findOne(user_receiver);

        if(!userReceiverExists) {
            throw new Error('User receiver does not exists');
        }

        const complimentRepository = getCustomRepository(ComplimentsRepositories);
        
        const compliment = complimentRepository.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        });

        await complimentRepository.save(compliment);

        return compliment;
    }

}

export default CreateComplimentService;