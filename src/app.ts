import express, { Application, Request, Response } from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.use(loggerMiddleware);
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with Custom Logger!');
});

app.get('/api/products', (req: Request, res: Response) => {
  res.json([{ id: 101, name: 'Laptop' }, { id: 102, name: 'Mouse' }]);
});

app.post('/api/orders', (req: Request, res: Response) => {
  console.log('Processing order for:', req.body);
  res.status(201).json({ message: 'Order placed successfully', order: req.body });
});

export default app;