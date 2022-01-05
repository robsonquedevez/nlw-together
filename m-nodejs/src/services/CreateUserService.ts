import { getCustomRepository } from 'typeorm';
import UserRepositories from '../repositories/UserRepositories';
import User from '../entities/User';

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    async execute ({ name, email, admin }: IUserRequest): Promise<User> {

        const userRepository = getCustomRepository(UserRepositories);

        if(!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await userRepository.findOne({ 
            where: {
                email
            } 
        });

        if( userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = userRepository.create({
            name, 
            email, 
            admin
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;