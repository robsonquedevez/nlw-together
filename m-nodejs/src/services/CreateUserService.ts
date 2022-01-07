import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs'
import UserRepositories from '../repositories/UserRepositories';
import User from '../entities/User';

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute ({ name, email, admin, password }: IUserRequest): Promise<User> {

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

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name, 
            email, 
            admin,
            password: passwordHash
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;