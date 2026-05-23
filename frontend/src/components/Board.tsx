import type { Board as BoardType } from '../services/gameService';

interface BoardProps {
  board: BoardType;
  onColumnClick: (column: number) => void;
}

function Board({ board, onColumnClick }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => onColumnClick(colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;