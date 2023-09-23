import { useState } from 'react';

const STORAGE_KEY = 'session-count';

export const SessionStorage = () => {
  const sessionCounter = parseInt(sessionStorage.getItem(STORAGE_KEY));

  const [counter, setCounter] = useState(sessionCounter || 0);

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    sessionStorage.setItem(STORAGE_KEY, newCount);
    console.log(sessionStorage);
  };

  const handleReset = () => {
    setCounter(0);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div>
      <h3>Locale Storage - Example</h3>
      <p>Ilość kliknięć: {counter}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button style={{ marginLeft: '10px' }} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
