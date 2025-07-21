import { Router } from 'express';
import GamesRouter from '../services/games/index';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World with Custom Logger!');
});

router.use('/api/games', GamesRouter);

export default router;
