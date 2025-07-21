import express, { Application } from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import routes from './routes';
import { responseHandlerMiddleware, errorHandlerMiddleware, notFoundHandler } from './middleware/responseHandlerMiddleware';

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(loggerMiddleware);
app.use(express.json());
app.use(routes);

// 404 handler: must be after all routes
app.use(notFoundHandler);

// Response handler: after 404
app.use(responseHandlerMiddleware);

// Error handler: last
app.use(errorHandlerMiddleware);

export default app;