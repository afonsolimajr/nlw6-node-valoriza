import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {

    async execute ({ name, email, password, admin = false}: IUserRequest) {
        const userRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("É necessário informar um e-mail.");
        };

        const userAlreadyExists = await userRepository.findOne({ 
            email,
        });

        if (userAlreadyExists) {
            throw new Error("E-mail já cadastrado.");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService };