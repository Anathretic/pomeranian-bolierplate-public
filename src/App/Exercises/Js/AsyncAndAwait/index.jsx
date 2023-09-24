import { AsyncAwaitExample } from './AsyncAwaitExample';
import { AsyncAwaitExample2 } from './AsyncAwaitExample2';
import { AsyncAwaitExample3 } from './AsyncAwaitExample3';
import { ComplexPromises } from './AsyncAwaitExample4';
import { Exercise } from './Exercise';
import { Exercise2 } from './Exercise2';
import { PromisesExample } from './PromisesExample';
import { PromisesExample2 } from './PromisesExample2';
import { PromisesExample3 } from './PromisesExample3';
import { PromisesExample4 } from './PromisesExample4';

export const AsyncAndAwait = () => {
  return (
    <div>
      <h1>Async, Await, Promise methods</h1>
      <h2>Powtórka z poprzednich zajęć</h2>
      <PromisesExample />
      <PromisesExample2 />
      <PromisesExample3 />
      <PromisesExample4 />
      <h2>Async Await</h2>
      <p>ES6 vs ES7</p>
      <AsyncAwaitExample />
      <AsyncAwaitExample2 />
      <AsyncAwaitExample3 />
      <h3>Ćwiczenie</h3>
      <Exercise />
      <Exercise2 />
      <h2>Zarządzanie asynchronicznością</h2>
      <ComplexPromises />
    </div>
  );
};
