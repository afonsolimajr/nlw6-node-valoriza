import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";

import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json(
            {error: err.message}
        );
    }

    return response.status(200).json({
        status: "error",
        message: "Erro interno do servidor."
    });
});


app.listen(3000, () => { console.log('servidor esta rodando.')});