import type {Board , Player} from '../services/connect4.js';

export interface Game {
  id: string;
  playerRed: string;
  playerYellow: string;
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  gameOver: boolean;
}