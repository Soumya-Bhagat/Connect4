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

router.get('/games/:id', (req, res) => {
  const game = getGame(req.params.id);

  if (!game) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }

  res.json(game);
});

router.post('/games/:id/moves', (req, res) => {
  const game = getGame(req.params.id);

  if (!game) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }

  const moveSuccessful = playMove(req.params.id, req.body.column);

  if (!moveSuccessful) {
    res.status(400).json({ error: 'Invalid move' });
    return;
  }

  res.json(game);
});

export default router;