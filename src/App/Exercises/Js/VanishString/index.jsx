import { useEffect, useState } from 'react';

export const VanishString = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    let id;
    if (isVisible === true) {
      id = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
    return () => clearTimeout(id);
  }, [isVisible]);

  //------------------------------------------------------------------

  const [value, setValue] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleCounter = () => {
    clearInterval(intervalId);
    const id = setInterval(() => setValue((prevValue) => prevValue + 1), 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    clearInterval(intervalId);
  };

  const handleRestart = () => {
    clearInterval(intervalId);
    setValue(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <>
      <div>
        <button onClick={handleClick}>Kliknij mnie!</button>
        {isVisible && <p>VanishString</p>}
      </div>
      <p>----------------------------------------------------</p>
      <div>
        <p>
          Timer: <span>{value}</span>
        </p>
        <button onClick={handleCounter}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </>
  );
};
