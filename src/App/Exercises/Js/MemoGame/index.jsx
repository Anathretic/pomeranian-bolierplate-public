import { useEffect, useState } from 'react';

import { Button, OptionButton } from '../../../Components/Button';
import { TimeTracker } from '../../../Components/TimeTracker';
import { MainHeader } from '../../../Components/MainHeader';

import './styles.css';
import { Tile } from './Tile/Tile';
import {
  GameSettings,
  GameSettingsOutput,
} from '../../../Components/GameSettings';

function shuffleArray(s) {
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

function formatMoves(moves) {
  return Math.ceil(moves / 2);
}

const ELEMENT_OPTION = [8, 16, 20];
const GAME_CHARACTERS = [
  '☀',
  '☁',
  '★',
  '☘',
  '☎',
  '☂',
  '♥',
  '♣',
  '♦',
  '♩',
  '☯',
  '☮',
];

export const MemoGame = () => {
  const [status, setStatus] = useState('notStarted');
  const [elementsNumber, setElementsNumber] = useState();
  const [moves, setMoves] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [selectedTilesTimeout, setSelectedTilesTimeout] = useState();

  useEffect(() => {
    let timerInterval;

    if (isActiveTimer) {
      timerInterval = setInterval(
        () => setDuration((duration) => duration + 1),
        1000
      );
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isActiveTimer]);

  // refresh after tile select
  useEffect(() => {
    const areMatch = areSelectedTilesMatch();

    if (selectedTilesTimeout) {
      clearTimeout(selectedTilesTimeout);
    }

    setTiles((tiles) => {
      return tiles.map((tile) => {
        const isSelected = isTileSelected(tile.id);
        return {
          ...tile,
          isVisible: isSelected,
          isGuessed: tile.isGuessed || (isSelected && areMatch),
        };
      });
    });
    if (selectedTiles.length === 2 && !areMatch) {
      const timeout = setTimeout(() => {
        setSelectedTiles([]);
      }, 3000);
      setSelectedTilesTimeout(timeout);
    }
  }, [selectedTiles]);

  useEffect(() => {
    if (isGameFinished()) {
      setStatus('finished');
      setIsActiveTimer(false);
    }
  }, [tiles]);

  const handleStart = () => {
    if (!elementsNumber) {
      setStatus('startError');
      return;
    }
    setStatus('started');
    setMoves(0);
    setDuration(0);
    setIsActiveTimer(true);
    setTiles(getInitialTiles());
  };

  const handleStop = () => {
    setStatus('finished');
    setIsActiveTimer(false);
    setElementsNumber();
    setTiles([]);
  };

  const handleTileClick = (id) => () => {
    setMoves(moves + 1);
    selectTile(id);
  };

  const selectTile = (id) => {
    setSelectedTiles((selectedTiles) => {
      const newTile = tiles.find((tile) => tile.id === id);
      const newSelectedTiles = [];
      if (selectedTiles.length < 2) {
        newSelectedTiles.push(...selectedTiles, newTile);
        return newSelectedTiles;
      } else {
        return [newTile];
      }
    });
  };

  const isTileSelected = (id) => {
    return !!selectedTiles.find((selectedTile) => selectedTile.id === id);
  };

  const isGameFinished = () => {
    let isFinished = true;

    // old for ---------------------------------------------------
    // for (let index = 0; index < tiles.length; index++) {
    //   isFinished = isFinished && tiles[index].isGuessed;
    // }

    // never -----------------------------------------------------
    // for (const tile of tiles) {
    //   isFinished = isFinished && tile.isGuessed;
    // }

    // forEach ---------------------------------------------------
    // tiles.forEach((tile) => {
    //   isFinished = isFinished && tile.isGuessed;
    // });

    // reduce ----------------------------------------------------
    // isFinished = tiles.reduce(
    //   (prevValue, currentValue) => prevValue && currentValue.isGuessed,
    //   true
    // );

    // every -----------------------------------------------------
    isFinished = tiles.every((tile) => tile.isGuessed);

    // some ------------------------------------------------------
    // isFinished = !tiles.some(tile => !tile.isGuessed)

    return isFinished && tiles.length !== 0;
  };
  const areSelectedTilesMatch = () => {
    const [tile1, tile2] = selectedTiles;
    const areMatch =
      !!tile1 && !!tile2 && tile1.char === tile2.char && tile1.id !== tile2.id;
    console.log(areMatch);
    return areMatch;
  };

  const getInitialTiles = () => {
    const charsNumber = elementsNumber / 2;
    const characters = shuffleArray([...GAME_CHARACTERS]);
    characters.length = charsNumber;
    const arrayOfTilesObjects = [];
    characters.forEach((char) => {
      arrayOfTilesObjects.push({
        id: `${char}1`,
        char,
        isVisible: false,
        isGuessed: false,
      });
      arrayOfTilesObjects.push({
        id: `${char}2`,
        char,
        isVisible: false,
        isGuessed: false,
      });
    });
    return shuffleArray(arrayOfTilesObjects);
  };

  return (
    <div className="memo-game">
      <MainHeader>Memo</MainHeader>
      <p className="memo-description">
        Gra polegająca na zapamiętywaniu odkrytych kafli i łączeniu ich w pary
      </p>
      {status === 'finished' && (
        <div className="memo-result">
          Gratulację! Twój wynik to {formatMoves(moves)} ruchów w czasie{' '}
          {<TimeTracker time={duration} />}!
        </div>
      )}
      {status !== 'started' && (
        <>
          <GameSettings
            label="liczba elementów"
            errorMessage={status === 'startError' && !elementsNumber && 'wybierz elementy'}
          >
            {ELEMENT_OPTION.map((option) => (
              <OptionButton
                key={option}
                isSelected={elementsNumber !== option}
                onClick={() => setElementsNumber(option)}
              >
                {option} elementów
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
              <TimeTracker time={duration} />
            </GameSettingsOutput>
          </GameSettings>
          <GameSettings label="liczba ruchów">
            <GameSettingsOutput>{formatMoves(moves)}</GameSettingsOutput>
          </GameSettings>
          <GameSettings label="przyciski sterujące">
            <Button onClick={handleStop} variant="tertiary">
              Stop
            </Button>
          </GameSettings>
        </>
      )}
      <div className="memo-tile-board">
        {tiles.map(({ id, char, isVisible, isGuessed }) => (
          <Tile
            key={id}
            onClick={handleTileClick(id)}
            char={char}
            isVisible={isVisible}
            isGuessed={isGuessed}
            isCorrect={selectedTiles.length < 2}
          />
        ))}
      </div>
    </div>
  );
};
