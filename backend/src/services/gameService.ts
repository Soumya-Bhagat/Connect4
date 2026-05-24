import { createBoard, makeMove, checkWin, isBoardFull } from './connect4.js';
import type { Game } from '../types/game.js';

const games = new Map<string, Game>();

export function createGame(): Game {
  const game: Game = {
    id: crypto.randomUUID(),
    board: createBoard(),
    currentPlayer: 'R',
    winner: null,
    gameOver: false,
  };

  games.set(game.id, game);

  return game;
}

export function getGame(id: string): Game | undefined {
  return games.get(id);
}

export function playMove(gameId: string, column: number): boolean {
  const game = games.get(gameId);
  
  if (!game || game.gameOver) {
    return false;
  }
  const player = game.currentPlayer;
  const moveSuccessful = makeMove(game.board, column, player);
  if (!moveSuccessful) {
    return false;
  }
  if (checkWin(game.board, player)) {
    game.winner = player;
    game.gameOver = true;
  } else if (isBoardFull(game.board)) {
    game.gameOver = true;
  }
  else {
    game.currentPlayer = player === 'R' ? 'Y' : 'R';
  }
  

  return true;
}

