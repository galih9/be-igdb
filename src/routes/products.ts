import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json([{ id: 101, name: 'Laptop' }, { id: 102, name: 'Mouse' }]);
});

export default router;
