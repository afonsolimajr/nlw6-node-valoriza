import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({email});

        if (!user) {
            throw new Error("E-mail ou senha incorretos");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("E-mail ou senha incorretos");
        }

        const md5Gerado = "bc5c0a046eb9c26d7ade209bff673782"; //pelosporttudo
        const token = sign(
            {email: user.email},
            md5Gerado,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return token;
    }

}

export { AuthenticateUserService };