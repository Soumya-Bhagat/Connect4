import { useNavigate } from 'react-router-dom';
import { createGame, joinGame } from '../services/api';
import '../App.css';
import { useState } from 'react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();

  async function handleCreateGame() {
    const game = await createGame(username);
    localStorage.setItem(
  'username',
  username
);
    navigate(`/game/${game.id}`);
  }

  async function handleJoinGame(gameId: string) {
    localStorage.setItem(
  'username',
  username
);
    await joinGame(gameId, username);
    navigate(`/game/${gameId}`);
  }

  return (
    <div>
      <h1 className="title">Connect 4</h1>
        <div>
      <button className="reset-button" style={{ marginTop: '2rem' }} onClick={handleCreateGame}>
        Create Game
      </button>
        </div>
      <button className="reset-button" style={{ marginTop: '2rem' }} onClick={() => handleJoinGame(gameId)}>
        Join Game
      </button>
      <div style={{ marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
    </div>
    </div>
  );
}