import {useEffect, useState} from 'react';
import BoardComponent from './components/Board';
import TopHeader from './components/TopHeader';
import WinnerModal from './components/WinnerModal';
import {
  createGame,
  makeMove,
  type Game,
} from './services/api';
import './App.css';

function App() {
    const [game, setGame] = useState<Game | null>(null);
    useEffect(() => {
        async function initializeGame() {
            const newGame = await createGame();
            setGame(newGame);
        }

    initializeGame();
    }, []);
    async function handleReset() {
        const newGame = await createGame();
        setGame(newGame);
    }
    async function handleMove(column: number) {
        if (!game || game.gameOver) {
            return;
        }

        const updatedGame = await makeMove(
            game.id,
            column
        );
        console.log(updatedGame.board);
        setGame(updatedGame);
    }
    if (!game) {
        return <div>Loading...</div>;
    }
    else {
   return (
    <div className="App">
        <TopHeader currentPlayer={game.currentPlayer} onReset={handleReset} />
        {game.winner && (
            <WinnerModal winner={game.winner} onReset={handleReset} />
        )}
        <BoardComponent board={game.board} onColumnClick={handleMove} />
    </div>
  );
}

}





export default App;