import 'reflect-metadata';
import env from 'dotenv';
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import "./database";
import routes from './routes';

env.config();

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof Error) {
        return response.status(400).json({
            error: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

app.listen(3000, () => { console.log('server running') });