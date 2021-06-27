import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {

    async handle(request: Request, response: Response) {
        const listService = new ListUsersService();

        const tags = await listService.execute();

        return response.json(tags);
    }
}

export { ListUsersController };