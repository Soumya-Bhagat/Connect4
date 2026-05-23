interface TopHeaderProps {
  currentPlayer: 'R' | 'Y';
  onReset: () => void;
}

function TopHeader({
  currentPlayer,
  onReset,
}: TopHeaderProps) {
  return (
    <>
      <h1 className="title">CONNECT 4</h1>

      <div className="top-bar">
        <div className="turn-indicator">
          <div
            className={
              currentPlayer === 'R'
                ? 'player-red'
                : 'player-green'
            }
          />

          <span>Turn</span>
        </div>

        <button
          className="reset-button"
          onClick={onReset}
        >
          RESET
        </button>
      </div>
    </>
  );
}

export default TopHeader;