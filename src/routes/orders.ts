import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  console.log('Processing order for:', req.body);
  res.status(201).json({ message: 'Order placed successfully', order: req.body });
});

export default router;
