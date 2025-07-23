import express, { Application } from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import routes from './routes';
import cors from 'cors';
import { responseHandlerMiddleware, errorHandlerMiddleware, notFoundHandler } from './middleware/responseHandlerMiddleware';

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(loggerMiddleware);
app.use(express.json());
app.use(routes);

app.use(notFoundHandler);

app.use(responseHandlerMiddleware);

app.use(errorHandlerMiddleware);

export default app;