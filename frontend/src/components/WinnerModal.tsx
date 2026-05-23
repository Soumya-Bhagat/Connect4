import type { Player } from '../services/gameService';

interface WinnerModalProps {
  winner: Player | null;
  onReset: () => void;
}

function WinnerModal({
  winner,
  onReset,
}: WinnerModalProps) {
  if (!winner) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="winner-modal">
        <h2
        className={
            winner === 'R'
            ? 'winner-red'
            : 'winner-green'
        }
        > Player {winner} Wins!
        </h2>

        <button
          className="play-again-button"
          onClick={onReset}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default WinnerModal;