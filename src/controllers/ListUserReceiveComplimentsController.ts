import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiverComplimentsController {

    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listService = new ListUserReceiveComplimentsService();

        const compliments = await listService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceiverComplimentsController };