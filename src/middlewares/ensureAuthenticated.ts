import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).end();
    }

    const token = authToken.split(" ");
    console.log(token);
    try {
        const payload = verify(token[1], "bc5c0a046eb9c26d7ade209bff673782") as IPayload;
        
        request.user_id = payload.sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }

    
}