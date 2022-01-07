import { NextFunction, Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UserRepositories from '../repositories/UserRepositories';

interface IResponseJWT {    
    email: string;
    iat: number;
    exp: number;
    sub: string; 
}

export async function ensureAdmin (request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization;

    if(!auth) {
        throw new Error('Token is missing');
    }

    const [, token] = auth?.split(' ');

    try {
        const decoded = verify(
            token, 
            process.env.JWT_SECRET_TOKEN as string
        );

        const { sub } = decoded as IResponseJWT;

        const userRepository = getCustomRepository(UserRepositories);        
    
        const checkedAdminUser = await userRepository.findOne({
            where: {
                id: sub
            }
        });
    
        if(!checkedAdminUser) {
            throw new Error('User is not exists');
        }
    
        if(checkedAdminUser.admin) {
            return next();
        }
    
        return response.status(401).json({
            status: 'warning',
            error: 'User at not permission'
        });


    } catch (error) {
        throw new Error('Invalid token');
    }  

}