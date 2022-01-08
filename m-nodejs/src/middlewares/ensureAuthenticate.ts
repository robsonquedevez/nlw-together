import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticate (request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization;

    if(!auth) {
        throw new Error('Token is missing');
    }

    const [, token] = auth?.split(' ');

    try {
        verify(
            token, 
            process.env.JWT_SECRET_TOKEN as string
        );
        
        return next();
    } catch (error) {
        throw new Error('Invalid token');
    }  

}