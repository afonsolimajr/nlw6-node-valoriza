import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request;
    
    const userRepositories = getCustomRepository(UsersRepositories);
    
    const { admin } = await userRepositories.findOne(user_id);
    //verifica se usuário é admin
    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: "Não autorizado"
    });
}