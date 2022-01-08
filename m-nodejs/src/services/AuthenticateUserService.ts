import { getCustomRepository } from 'typeorm';
import UserRepositories from '../repositories/UserRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthRequest): Promise<string> {

        const userRepository = getCustomRepository(UserRepositories);

        const user = await userRepository.findOne({
            where: {
                email
            }
        });

        if(!user) {
            throw new Error('Email or password incorrect');
        }

        const passwordValidation = await compare(password, user.password);

        if(!password) {
            throw new Error('Email or password incorrect');
        }

        const token = sign(
            {email: user.email}, 
            process.env.JWT_SECRET_TOKEN as string,
            {
                subject: user.id,
                expiresIn: '2h'
            }
        )

        return token;
    }

}

export default AuthenticateUserService;