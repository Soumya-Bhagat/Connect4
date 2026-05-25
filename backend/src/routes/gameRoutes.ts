import { Router } from 'express';
import {
  createGame,
  getGame,
  playMove,
  joinGame,
  resetGame
} from '../services/gameService.js';
import { db } from '../db/database.js';

const router = Router();

router.post('/games', (req, res) => {
  const game = createGame(
    req.body.playerRed
  );

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
  const updatedGame = playMove(
    req.params.id,
    req.body.column
  );

  if (!updatedGame) {
    res.status(400).json({
      error: 'Invalid move'
    });
    return;
  }

  res.json(updatedGame);
});

router.get('/games/:id/moves', (req, res) => {
  const game = getGame(req.params.id);
  const moves = db.prepare(`
    SELECT move_number, player, column_played FROM moves
    WHERE game_id = ?
    ORDER BY move_number ASC
  `).all(req.params.id);

  res.json(moves);
});

router.post(
  '/games/:id/join',
  (req, res) => {
    const game = joinGame(
      req.params.id,
      req.body.username
    );

    if (!game) {
      res.status(400).json({
        error: 'Cannot join game'
      });
      return;
    }

    res.json(game);
  }
);

router.post('/games/:id/reset', (req, res) => {
  const game = resetGame(req.params.id);

  if (!game) {
    res.status(400).json({
      error: 'Cannot reset game'
    });
    return;
  }

  res.json(game);
});

export default router;