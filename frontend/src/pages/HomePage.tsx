import { useNavigate } from 'react-router-dom';
import { createGame } from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();

  async function handleCreateGame() {
    const game = await createGame();

    navigate(`/game/${game.id}`);
  }

  return (
    <div>
      <h1>Connect 4</h1>

      <button onClick={handleCreateGame}>
        Create Game
      </button>
    </div>
  );
}