import { getCustomRepository } from 'typeorm';
import UserRepositories from '../repositories/UserRepositories';
import { instanceToPlain } from 'class-transformer';


class ListUserService {

    async execute() {

        const userRepository = getCustomRepository(UserRepositories);

        const users = userRepository.find();

        return instanceToPlain(users);
    }

}

export default ListUserService;