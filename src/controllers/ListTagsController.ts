import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {

    async handle(request: Request, response: Response) {
        const listService = new ListTagsService();

        const tags = await listService.execute();

        return response.json(tags);
    }
}

export { ListTagsController };