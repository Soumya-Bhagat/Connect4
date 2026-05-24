import { Router } from 'express';
import {
  createGame,
  getGame,
  playMove
} from '../services/gameService.js';

const router = Router();

router.post('/games', (req, res) => {
  const game = createGame();

  res.status(201).json(game);
});

export default router;