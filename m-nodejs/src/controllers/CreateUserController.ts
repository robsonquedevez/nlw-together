import { Request, Response } from "express"
import CreateUserService from "../services/CreateUserService";

class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ 
            name,
            email,
            admin,
            password
        });

        return response.status(201).json(user);
    }

}

export default CreateUserController;