import { Router } from 'express';
import productsRouter from './products';
import ordersRouter from './orders';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World with Custom Logger!');
});

router.use('/api/products', productsRouter);
router.use('/api/orders', ordersRouter);

export default router;
