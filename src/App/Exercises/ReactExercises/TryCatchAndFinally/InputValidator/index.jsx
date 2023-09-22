import { useState } from 'react';

export const InputValidator = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleValidate = (value) => {
    setInputValue(value);

    if (isNaN(value) && value !== '') {
      setErrorMsg('Podana wartość nie jest liczbą całkowitą, popraw to!');
    } else if (Number.isInteger(parseFloat(value)) !== true && value !== '') {
      setErrorMsg('Podana wartość nie jest liczbą całkowitą, popraw to!');
    } else {
      setErrorMsg(null);
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: '3rem' }}>Zadanie z inputem!</h2>
      <input
        style={{
          border: 'none',
          borderRadius: '8px',
          boxShadow: '1px 1px 10px grey',
          padding: '8px',
        }}
        type="text"
        onChange={(e) => handleValidate(e.target.value)}
      />
      <p>Wartość inputa to: {inputValue}</p>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
};
