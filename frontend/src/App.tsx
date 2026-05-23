import type {Board, Player} from './services/gameService';
import {createBoard, makeMove, checkWin} from './services/gameService';
import {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [board, setBoard] = useState<Board>(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('R');
    const [winner, setWinner] = useState<Player | null>(null);
    function handleReset() {
        setBoard(createBoard());
        setCurrentPlayer('R');
        setWinner(null);
    }
    function handleMove(column: number) {
    if (winner) return;
        const newBoard: Board = board.map(row => [...row]);
        if (makeMove(newBoard, column, currentPlayer)) {
            setBoard(newBoard);
            if (checkWin(newBoard, currentPlayer)) {
                setWinner(currentPlayer);
            } else {
                setCurrentPlayer(currentPlayer === 'R' ? 'Y' : 'R');
            }
        }
    }
   return (
    <div className="App">
        <h1>Connect Four</h1>
        <p>Current Player: {currentPlayer}</p>
        {winner && (
    <h2>Player {winner} Wins!</h2>
)}
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className="cell" onClick={() => handleMove(colIndex)}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <button onClick={handleReset}>Reset Game</button>
    </div>
  );

}





export default App;