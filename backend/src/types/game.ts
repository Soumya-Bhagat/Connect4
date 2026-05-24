import type {Board , Player} from '../services/connect4.js';

export interface Game {
  id: string;
  board: Board;
  currentPlayer: Player;
}