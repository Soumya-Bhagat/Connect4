import { useNavigate } from 'react-router-dom';
import { createGame } from '../services/api';
import '../App.css';

export default function HomePage() {
  const navigate = useNavigate();

  async function handleCreateGame() {
    const game = await createGame();

    navigate(`/game/${game.id}`);
  }

  return (
    <div>
      <h1 className="title">Connect 4</h1>

      <button className="reset-button" style={{ marginTop: '2 rem' }} onClick={handleCreateGame}>
        Create Game
      </button>
    </div>
  );
}