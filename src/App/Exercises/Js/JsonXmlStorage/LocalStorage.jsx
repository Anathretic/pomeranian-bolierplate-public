import { useState } from 'react';

const STORAGE_KEY = 'local-count';

export const LocaleStorage = () => {
  const localCounter = parseInt(localStorage.getItem(STORAGE_KEY));

  const [counter, setCounter] = useState(localCounter || 0);

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    localStorage.setItem(STORAGE_KEY, newCount);
    console.log(localStorage);
  };

  const handleReset = () => {
    setCounter(0);
    localStorage.removeItem(STORAGE_KEY);
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
