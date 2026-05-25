import {useEffect, useState} from 'react';
import BoardComponent from '../components/Board';
import TopHeader from '../components/TopHeader';
import WinnerModal from '../components/WinnerModal';
import { useNavigate } from 'react-router-dom';
import {
  createGame,
  getGame,
  makeMove,
  resetGame,
  type Game,
} from '../services/api';
import { useParams } from 'react-router-dom';
import '../App.css';

function GamePage() {
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    const { id } = useParams();
    const username =
  localStorage.getItem('username');
    useEffect(() => {
        async function loadGame() {
            if (id) {
                const game = await getGame(id);
                setGame(game);
            }
        }

    loadGame();
    }, [id]);
    useEffect(() => {
    if (!id) return;

    const interval = setInterval(async () => {
        const latestGame = await getGame(id);
        setGame(latestGame);
    }, 2000);

    return () => clearInterval(interval);
    }, [id]);

    async function handleReset() {
        if (!game) return;

        const resetedGame = await resetGame(game.id);
        setGame(resetedGame);
    }
    async function handleMove(column: number) {
        if (!game || game.gameOver || !isMyTurn) {
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
    const isMyTurn =
    (game.currentPlayer === 'R' &&
     username === game.playerRed)
 ||
    (game.currentPlayer === 'Y' &&
     username === game.playerYellow);
    console.log({
  username,
  playerRed: game.playerRed,
  playerYellow: game.playerYellow,
  currentPlayer: game.currentPlayer,
  isMyTurn,
});
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





export default GamePage;