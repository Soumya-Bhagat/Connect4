export type Board = string[][];
export type Player = 'R' | 'Y';

export interface Game {
  id: string;
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  gameOver: boolean;
}

const API_URL =
  import.meta.env.VITE_API_URL;

export async function createGame(): Promise<Game> {
  const response = await fetch(
    `${API_URL}/games`,
    {
      method: 'POST',
    }
  );

  return response.json();
}

export async function getGame(
  id: string
): Promise<Game> {
  const response = await fetch(
    `${API_URL}/games/${id}`
  );

  return response.json();
}

export async function makeMove(
  gameId: string,
  column: number
): Promise<Game> {
  const response = await fetch(
    `${API_URL}/games/${gameId}/moves`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        column,
      }),
    }
  );

  return response.json();
}