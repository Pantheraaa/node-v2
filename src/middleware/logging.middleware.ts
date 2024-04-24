import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();
        res.on("finish", () => {
            const finishTime = Date.now();
            const timeTaken = finishTime - startTime;
            console.log(`${req.method} ${req.url} ${res.statusCode} ${timeTaken} ms`);
        })
        next();
    }
}