import { createBoard, makeMove } from './connect4.js';
import type { Game } from '../types/game.js';

const games = new Map<string, Game>();

export function createGame(): Game {
  const game: Game = {
    id: crypto.randomUUID(),
    board: createBoard(),
    currentPlayer: 'R',
  };

  games.set(game.id, game);

  return game;
}

export function getGame(id: string): Game | undefined {
  return games.get(id);
}

export function playMove(gameId: string, column: number): boolean {
  const game = games.get(gameId);

  if (!game) {
    return false;
  }

  const moveSuccessful = makeMove(game.board, column, game.currentPlayer);

  if (moveSuccessful) {
    game.currentPlayer = game.currentPlayer === 'R' ? 'Y' : 'R';
  }

  return moveSuccessful;
}
