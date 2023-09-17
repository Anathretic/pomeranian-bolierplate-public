import './styles.css';

export const GameSettings = ({ label, children, errorMessage }) => {
  return (
    <div
      className={`game-settings-container ${
        errorMessage ? 'game-settings-container-error' : ''
      }`}
    >
      <span className="game-label">
        {label}
        <span className="game-label-error">{errorMessage}</span>
      </span>
      {children}
    </div>
  );
};

export const GameSettingsOutput = ({ children }) => {
  return <div className="game-output">{children}</div>;
};
