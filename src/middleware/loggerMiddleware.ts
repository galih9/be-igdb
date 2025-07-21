import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
const morganMiddleware = morgan('dev');

export const loggerMiddleware = [
morganMiddleware,
(req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${dayjs(timestamp).format("DD/MM/YYYY: HH:mm:ss")}] ${method} ${url}`);

    res.on('finish', () => {
      const startTime = Date.now();
      const responseTime = Date.now() - startTime;
      console.log(`[${dayjs(timestamp).format("DD/MM/YYYY: HH:mm:ss")}] ${method} ${url} - Status: ${res.statusCode} - ${responseTime}ms`);
    });

    next();
  }
];