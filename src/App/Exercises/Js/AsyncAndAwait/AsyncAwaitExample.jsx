import { useState } from 'react';

const DELAY = 500;

export const AsyncAwaitExample = () => {
  const [results, setResults] = useState();

  const handleOnClick = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) resolve('Success');
        reject('Rejected');
      }, DELAY);
    });
    // promise
    //   .then((result) => setResults(result))
    //   .catch((err) => setResults(err));

    try {
      const result = await promise;
      setResults(result);
    } catch (error) {
      setResults(error);
    }
  };

  return (
    <div>
      <h3>Async Await Example 1</h3>
      <button type="button" onClick={handleOnClick}>
        Start
      </button>
      <button
        style={{ marginLeft: '10px' }}
        type="button"
        onClick={() => setResults('')}
      >
        Reset
      </button>
      <div>Result: {results}</div>
    </div>
  );
};
