import { createBoard, makeMove, checkWin, isBoardFull } from './connect4.js';
import type { Game } from '../types/game.js';
import { db } from '../db/database.js';

interface GameRow {
  id: string;
  player_red: string;
  player_yellow: string;
  board_json: string;
  current_player: string;
  winner: string | null;
  game_over: number;
}

interface MoveRow {
    id: number;
    game_id: string;
    move_number: number;
    player: string;
    column_played: number;
    created_at: string;
}

export function createGame(playerRed: string): Game {
  const game: Game = {
    id: crypto.randomUUID(),
    playerRed,
    playerYellow: '',
    board: createBoard(),
    currentPlayer: 'R',
    winner: null,
    gameOver: false,
  };

    db.prepare(`
    INSERT INTO games (
        id,
        player_red,
        player_yellow,
        board_json,
        current_player,
        winner,
        game_over
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
    game.id,
    game.playerRed,
    game.playerYellow,
    JSON.stringify(game.board),
    game.currentPlayer,
    game.winner,
    0
    );

  return game;
}

export function getGame(id: string): Game | undefined {
  const row = db.prepare(`
    SELECT * FROM games WHERE id = ?
  `).get(id) as GameRow | undefined;

  if (!row) {
    return undefined;
  }

  return {
    id: row.id,
    playerRed: row.player_red,
    playerYellow: row.player_yellow,
    board: JSON.parse(row.board_json),
    currentPlayer: row.current_player as 'R' | 'Y',
    winner: row.winner as 'R' | 'Y' | null,
    gameOver: !!row.game_over
  };
}

export function playMove(gameId: string, column: number): Game | undefined {
  const game = getGame(gameId);

  if (!game || game.gameOver) {
    return undefined;
  }
  const player = game.currentPlayer;
  const moveSuccessful = makeMove(game.board, column, player);
  if (!moveSuccessful) {
    return undefined;
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
  db.prepare(`
    UPDATE games
    SET board_json = ?, current_player = ?, winner = ?, game_over = ?
    WHERE id = ?
  `).run(
    JSON.stringify(game.board),
    game.currentPlayer,
    game.winner,
    game.gameOver ? 1 : 0,
    game.id
  );
    const moveRow = db.prepare(`
    SELECT * FROM moves
    WHERE game_id = ?
    ORDER BY move_number DESC
    LIMIT 1
  `).get(game.id) as MoveRow | undefined;

  db.prepare(`
    INSERT INTO moves (game_id, column_played, player, move_number)
    VALUES (?, ?, ?, ?)
  `).run(
    game.id,
    column,
    player,
    moveRow ? moveRow.move_number + 1 : 1
  );

  return game;
}

export function joinGame(
  gameId: string,
  username: string
): Game | undefined {
  const game = getGame(gameId);

  if (!game) {
    return undefined;
  }

  if (game.playerYellow) {
    return undefined;
  }

  game.playerYellow = username;

  db.prepare(`
    UPDATE games
    SET player_yellow = ?
    WHERE id = ?
  `).run(
    username,
    gameId
  );

  return game;
}
