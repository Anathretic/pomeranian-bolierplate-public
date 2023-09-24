import { useState } from 'react';

const DELAY = 500;
const times = 1e6;

const getSomeResult = (max = 10000, delay = DELAY) =>
  new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.time(`Inner - ${max}`);
      const result = Array(max)
        .fill(0)
        .map((_, index) => ({ index }));
      console.timeEnd(`Inner - ${max}`);
      resolve(`Success: ${result.length}`);
    }, delay);
  });

export const ComplexPromises = () => {
  const [results, setResults] = useState();

  const handleOneByOne = async () => {
    console.time('promise-one-by-one');
    const p1 = await getSomeResult(times);
    const p2 = await getSomeResult(times * 2);
    const p3 = await getSomeResult(times * 3);
    console.timeEnd('promise-one-by-one');
    setResults([p1, p2, p3].join(', '));
  };

  const handleAll = async () => {
    console.time('promise-all');
    const p1 = getSomeResult(times);
    const p2 = getSomeResult(times * 2);
    const p3 = getSomeResult(times * 3);
    const allDone = await Promise.all([p1, p2, p3]);
    // Rejected when any of the promises in the given array reject!
    // Rejection reason is the reason of the FIRST promise that rejected
    console.timeEnd('promise-all');
    setResults(allDone.join(', '));
  };

  const handleAllSettled = async () => {
    console.time('promise-all-settled');
    const p1 = getSomeResult(times);
    const p2 = getSomeResult(times * 2);
    const p3 = Promise.reject('Failed');
    const allSettled = await Promise.allSettled([p1, p2, p3]);
    // Returns an array of results (both rejected and fulfilled)
    // Each result contains information about status and value or reason
    console.timeEnd('promise-all-settled');
    setResults(
      allSettled
        .map(
          ({ status, value, reason }) =>
            `${status.charAt(0).toUpperCase() + status.slice(1)} - ${value} - ${
              reason ? '😣' : '😀'
            }`
        )
        .join(', ')
    );
  };

  const handleAny = async () => {
    console.time('promise-any');
    // const p1 = getSomeResult(times);
    // const p2 = getSomeResult(times * 2);
    // const p3 = getSomeResult(times * 3);
    const p1 = getSomeResult(times, 3);
    const p2 = getSomeResult(times * 2, 2);
    const p3 = Promise.reject('Failed');
    const anyFulfilled = await Promise.any([p1, p2, p3]);
    // Promise fulfills when any of the inputs fulfills
    // It rejects when all of the promisses reject
    // It fulfills with first promise fulfillment value
    console.timeEnd('promise-any');
    setResults(anyFulfilled);
  };

  const handleRace = async () => {
    console.time('promise-race');
    const p1 = getSomeResult(times, 3);
    const p2 = getSomeResult(times * 2, 2);
    const p3 = getSomeResult(times * 3, 1);
    // const p1 = getSomeResult(times, 3);
    // const p2 = getSomeResult(times * 2, 2);
    // const p3 = Promise.reject('Failed');
    const promiseRace = await Promise.race([p1, p2, p3]);
    // Creates a Promise that is resolved or rejected when any of the provided Promises are resolved or rejected.
    // Returns first SETTLED promise

    console.timeEnd('promise-race');
    setResults(promiseRace);
  };

  return (
    <div>
      <h3>Complex Promises</h3>
      <button onClick={handleOneByOne}>Handle One by One</button>
      <button style={{ marginLeft: '10px' }} onClick={handleAll}>
        Handle All
      </button>
      <button style={{ marginLeft: '10px' }} onClick={handleAllSettled}>
        Handle All Settled
      </button>
      <button style={{ marginLeft: '10px' }} onClick={handleAny}>
        Handle Any
      </button>
      <button style={{ marginLeft: '10px' }} onClick={handleRace}>
        Handle Race
      </button>
      <button
        style={{ marginLeft: '10px' }}
        type="button"
        onClick={() => setResults('')}
      >
        Reset
      </button>
      <div>Result: {[results]}</div>
    </div>
  );
};
