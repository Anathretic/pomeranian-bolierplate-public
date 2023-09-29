import { useEffect, useState } from 'react';
import { Button, OptionButton } from '../../../Components/Button';
import { MainHeader } from '../../../Components/MainHeader';
import { TimeTracker } from '../../../Components/TimeTracker';

import './style.css';

import { Tile } from './Tile/Tile';
import {
  GameSettings,
  GameSettingsOutput,
} from '../../../Components/GameSettings';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const MINUTE = 1; //1 minuta
const MOLES_SPEED = [3000, 2000, 1000];
const BUTTON_VARIANTS = [1, 2, 3];

export const HitTheMoleGame = () => {
  //getter i setter - destrukturyzacja useState()
  const [status, setStatus] = useState('notStarted');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(MINUTE);
  const [resultTime, setResultTime] = useState(0);
  const [molesNo, setMolesNo] = useState(1);
  const [moles, setMoles] = useState([]);
  const [molesTimeouts, setMolesTimeouts] = useState({});
  const [tiles, setTiles] = useState([]);
  const [minutes, setMinutes] = useState(MINUTE);
  const [seconds, setSeconds] = useState(0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);

  const createMole = (newMoles, id) => {
    const maxPosition = molesNo * 5 + 5;
    let newPosition = getRandomInt(maxPosition);
    while (newMoles.find((mole) => mole.position === newPosition)) {
      newPosition = getRandomInt(maxPosition);
    }

    const timeout = setTimeout(function () {
      moveMole(newPosition);
    }, MOLES_SPEED[molesNo - 1]);

    setMolesTimeouts((prevTimeouts) => {
      if (prevTimeouts[id]) {
        clearTimeout(prevTimeouts[id]);
      }

      return {
        ...prevTimeouts,
        [id]: timeout,
      };
    });

    return {
      position: newPosition,
      id,
    };
  };

  const shuffleMoles = () => {
    const newMoles = [];
    for (let i = 0; i < molesNo; i++) {
      newMoles.push(createMole(newMoles, i));
    }
    setMoles(newMoles);
  };

  const moveMole = (position) => {
    setMoles((currentMoles) => {
      const currentMole = currentMoles.find(
        (mole) => mole.position === position
      );

      if (currentMole) {
        const newMolesPositions = currentMoles.filter(
          (mole) => mole.position !== position
        );

        const newMole = createMole(newMolesPositions, currentMole.id);
        newMolesPositions.push(newMole);
        return newMolesPositions;
      }
    });
  };

  const getDecrementTime = () => {
    if (minutes <= 0 && seconds <= 0) {
      setStatus('finished');
      setIsActiveTimer(false);
      setResultTime(`${duration}:00`);
    }

    if (seconds === 0) {
      setMinutes((prevMinutes) => prevMinutes - 1);
      setSeconds(59);
    } else {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }
  };

  //react lifecycle hook
  useEffect(() => {
    let timerInterval;

    if (isActiveTimer) {
      timerInterval = setInterval(getDecrementTime, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isActiveTimer, seconds, minutes]);

  const handleStart = () => {
    setStatus('started');
    setResultTime(duration);
    setSeconds(0);
    setScore(0);
    setMinutes(duration);
    setIsActiveTimer(true);
    setTiles(getInitialTiles());
    shuffleMoles();
  };

  const handleStop = () => {
    setStatus('finished');
    setIsActiveTimer(false);
    setResultTime(resultTimeGuard());

    setMolesTimeouts((prevTimeouts) => {
      for (const index in prevTimeouts) {
        clearTimeout(prevTimeouts[index]);
      }

      return {};
    });

    setSeconds(0);
  };

  const isMoleOnPosition = (position) => {
    return moles.find((mole) => mole.position === position);
  };

  const handleTileClick = (position) => () => {
    if (isMoleOnPosition(position)) {
      setScore(score + 1);

      moveMole(position);
    } else {
      setScore(score - 1);
    }
  };

  const getInitialTiles = () => {
    return Array(molesNo * 5 + 5)
      .fill(0)
      .map((_, index) => ({ index }));
  };

  const resultTimeGuard = () => {
    let result;
    let min;
    let sec;
    minutes > 0 && seconds === 0
      ? (min = duration - minutes)
      : (min = duration - minutes - 1);
    seconds === 0
      ? (sec = '00')
      : (sec =
          60 - seconds <= 9
            ? (sec = `0${60 - seconds}`)
            : (sec = `${60 - seconds}`));
    result = `${min}:${sec}`;
    return result;
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
          Gratulację! Twój wynik to {score} złapane krety w czasie {resultTime}!
        </div>
      )}
      {status !== 'started' && (
        <>
          <GameSettings label="czas gry">
            {BUTTON_VARIANTS.map((timeValue) => (
              <OptionButton
                key={timeValue}
                isSelected={duration !== timeValue}
                onClick={() => {
                  setDuration(timeValue);
                  setMinutes(timeValue);
                }}
              >
                {timeValue} min
              </OptionButton>
            ))}
          </GameSettings>
          <GameSettings label="liczba kretów">
            {BUTTON_VARIANTS.map((moleValue) => (
              <OptionButton
                key={moleValue + 10}
                isSelected={molesNo !== moleValue}
                onClick={() => setMolesNo(moleValue)}
              >
                {moleValue}
              </OptionButton>
            ))}
          </GameSettings>
          <GameSettings label="przyciski sterujące">
            <Button onClick={handleStart} variant="tertiary">
              Start
            </Button>
          </GameSettings>
        </>
      )}

      {/* conditional rendering of jsx w React  */}
      {status === 'started' && (
        <>
          <GameSettings label="czas gry">
            <GameSettingsOutput>
              {<TimeTracker time={minutes * 60 + seconds} />}
            </GameSettingsOutput>
          </GameSettings>
          <GameSettings label="wynik">
            <GameSettingsOutput>{score}</GameSettingsOutput>
          </GameSettings>
          <GameSettings label="przyciski sterujące">
            <Button onClick={handleStop} variant="tertiary">
              Stop
            </Button>
          </GameSettings>
          <div className="mole-tile-board">
            {tiles.map(({ index }) => (
              <Tile
                key={index}
                isMole={isMoleOnPosition(index)}
                onClick={handleTileClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
