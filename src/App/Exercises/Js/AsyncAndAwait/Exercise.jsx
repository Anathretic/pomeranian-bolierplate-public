import { useEffect, useState } from 'react';

const DELAY = 500;

const getSomeResult = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('I"m resolved!');
    }, DELAY);
  });

export const Exercise = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    const handleAsync = async () => {
      try {
        const result = await getSomeResult();
        setResults(result);
      } catch (err) {
        setResults(err);
      }
    };
    handleAsync();
  }, []);

  return (
    <div>
      <h3>Exercise</h3>
      <p>Result: {results}</p>
    </div>
  );
};
