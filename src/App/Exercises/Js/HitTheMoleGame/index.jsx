import { useState } from 'react';

import { Button } from '../../../Components/Button';
import { MainHeader } from '../../../Components/MainHeader';

import './style.css';
import { Tile } from './Tile/Tile';

const MINUTE = 60000;

export const HitTheMoleGame = () => {
  // notStarted, started, finished
  const [status, setStatus] = useState('notStarted');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(MINUTE);
  const [timeLeft, setTimeLeft] = useState(0);
  const [resultTime, setResultTime] = useState(0);
  const [molesNo, setMolesNo] = useState(1);
  const [tiles, setTiles] = useState([]);

  const handleStart = () => {
    setStatus('started');
    setResultTime(duration - timeLeft);
    setTiles(getInitialTiles());
  };

  const handleStop = () => {
    setStatus('finished');
    setResultTime(duration - timeLeft);
  };

  const getInitialTiles = () => {
    return Array(molesNo * 5 + 5)
      .fill(0)
      .map((_, index) => ({ index }));
  };

  return (
    <div className="hit-the-mole-game">
      <MainHeader>Kret</MainHeader>
      <p className="mole-description">
        Gra polegająca na podążaniu za krecikiem i trafieniu na kwadrat, w
        którym się pojawił.
      </p>
      {status === 'finished' && (
        <div className="mole-result">
          Gratulację! Twój wynik to {score} złapane krety w czasie {resultTime}{' '}
          minut!
        </div>
      )}
      {status !== 'started' && (
        <>
          <div className="mole-settings-container">
            <span className="mole-label">czas gry</span>
            <Button
              id="1"
              variant={duration !== MINUTE ? 'primary' : 'secondary'}
              onClick={() => setDuration(MINUTE)}
            >
              1 minuta
            </Button>
            <Button
              variant={duration !== 2 * MINUTE ? 'primary' : 'secondary'}
              onClick={() => setDuration(2 * MINUTE)}
            >
              2 minuty
            </Button>
            <Button
              variant={duration !== 3 * MINUTE ? 'primary' : 'secondary'}
              onClick={() => setDuration(3 * MINUTE)}
            >
              3 minuty
            </Button>
          </div>
          <div className="mole-settings-container">
            <span className="mole-label">liczba kretów</span>
            <Button
              variant={molesNo !== 1 ? 'primary' : 'secondary'}
              onClick={() => setMolesNo(1)}
            >
              1 kret
            </Button>
            <Button
              variant={molesNo !== 2 ? 'primary' : 'secondary'}
              onClick={() => setMolesNo(2)}
            >
              2 krety
            </Button>
            <Button
              variant={molesNo !== 3 ? 'primary' : 'secondary'}
              onClick={() => setMolesNo(3)}
            >
              3 krety
            </Button>
          </div>
          <div className="mole-settings-container">
            <span className="mole-label">przyciski sterujące</span>
            <Button onClick={handleStart}>Start</Button>
          </div>
        </>
      )}

      {status === 'started' && (
        <>
          <div className="mole-settings-container">
            <span className="mole-label">przyciski sterujące</span>
            <span className="mole-output">1:35</span>
          </div>
          <div className="mole-settings-container">
            <span className="mole-label">Wynik</span>
            <span className="mole-output">16</span>
          </div>
          <div className="mole-settings-container">
            <span className="mole-label">Przyciski sterujące</span>
            <Button onClick={handleStop} variant="tertiary">
              Stop
            </Button>
          </div>
          <div className="mole-tile-board">
            {tiles.map(({ index }) => (
              <Tile key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
