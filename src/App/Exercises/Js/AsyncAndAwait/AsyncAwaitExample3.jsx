import { useEffect, useState } from 'react';

const DELAY = 500;

const getSomeResult = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) resolve('Success');
      reject('Rejected');
    }, DELAY);
  });

export const AsyncAwaitExample3 = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    console.log('useEffect-1');
    const handleAsync = async () => {
      try {
        console.log('useEffect-2');
        const result = await getSomeResult();
        console.log('useEffect-3');
        setResults(result);
      } catch (err) {
        setResults(err);
      }
    };
    console.log('useEffect-4');
    handleAsync();
    console.log('useEffect-5');
  }, []);

  return (
    <div>
      <h3>Async Await Example 3</h3>
      <button type="button" onClick={() => setResults('')}>
        Reset
      </button>
      <div>Result: {results}</div>
    </div>
  );
};
