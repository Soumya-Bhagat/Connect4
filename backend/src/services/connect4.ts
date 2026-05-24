const ROWS = 6;
const COLS = 7;
const CONNECT = 4;

export type Board = string[][];
export type Player = 'R' | 'Y';

export function createBoard(): Board {
  return Array.from(
    { length: ROWS },
    () => Array(COLS).fill('.')
  );
}

export function isValidMove(board: Board, column: number): boolean {
  // Logic to check if a move is valid
  return column >= 0 && column < COLS && board[0][column] === '.';
}

export function makeMove(board: Board, column: number, player: Player): boolean {
    // Logic to make a move on the board
    if (!isValidMove(board, column)) {
        return false;
    }
    for (let row = ROWS - 1; row >= 0; --row) {
        if (board[row][column] === '.') {
            board[row][column] = player;
            return true;
        }
    }
    return false;
}

export function checkWinHorizontal(board: Board, player: Player): boolean {
  // Logic to check for a horizontal win
  for (const row of board) {
    for (let col = 0; col < COLS - 3; ++col) {
      if (row[col] === player && row[col + 1] === player &&
          row[col + 2] === player && row[col + 3] === player) {
        return true;
      }
    }
  }
  return false;
}

export function checkWinVertical(board: Board, player: Player): boolean {
    // Logic to check for a vertical win
    for (let col = 0; col < COLS; ++col) {
        for (let row = 0; row < ROWS - 3; ++row) {
            if (board[row][col] === player && board[row + 1][col] === player &&
                board[row + 2][col] === player && board[row + 3][col] === player) {
                return true;
            }
        }
    }
    return false;
}

export function checkWinDiagonalDown(board: Board, player: Player): boolean {
    // Logic to check for a diagonal down win
    for (let row = 0; row < ROWS - 3; ++row) {
        for (let col = 0; col < COLS - 3; ++col) {
            if (board[row][col] === player && board[row + 1][col + 1] === player &&
                board[row + 2][col + 2] === player && board[row + 3][col + 3] === player) {
                return true;
            }
        }
    }
    return false;
}

export function checkWinDiagonalUp(board: Board, player: Player): boolean {
  // Logic to check for a diagonal up win
    for (let row = CONNECT - 1; row < ROWS; ++row) {
        for (let col = 0; col < COLS - 3; ++col) {
            if (board[row][col] === player && board[row - 1][col + 1] === player &&
                board[row - 2][col + 2] === player && board[row - 3][col + 3] === player) {
                return true;
            }
        }
    }
    return false;
}

export function checkWin(board: Board, player: Player): boolean {
  // Logic to check for any win condition
  return checkWinHorizontal(board, player) || checkWinVertical(board, player) ||
         checkWinDiagonalDown(board, player) || checkWinDiagonalUp(board, player);
}

export function isBoardFull(board: Board): boolean {
  // Logic to check if the board is full
  for (const row of board) {
    for (const cell of row) {
      if (cell === '.') {
        return false;
      }
    }
  }
  return true;
}

