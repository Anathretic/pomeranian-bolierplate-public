// Programowanie asynchroniczne - problem wyścigów (RACE CONDITION)
// const raceCondition = () => {
//   let counter = 0;
//   const delay = 2000;
//   setInterval(() => {
//     const newValue = counter + 10;
//     console.log('dodano, wynik =', newValue);
//     setTimeout(() => (counter = newValue), 0);
//   }, delay);
//   setInterval(() => {
//     const newValue = counter - 10;
//     console.log('minus, wynik =', newValue);
//     setTimeout(() => (counter = newValue), 0);
//   }, delay);
// };

import { useState } from 'react';

export const PromisesAndMe = () => {
  const [sum, setSum] = useState(0);
  const [list, setList] = useState([]);

  // @@ KOD SYNCHRONICZNY @@
  // Linijka po linijce
  // Blokuje przeglądarkę
  function test1() {
    console.log('test1');
  }
  function test2() {
    console.log('test2');
  }
  console.log(1);
  console.log(2);
  test1();
  test2();

  // ---------------------------------------------------------

  // @@ KOD ASYNCHRONICZNY @@
  // Nie jest wykonywany po kolei - oczekuje na COŚ, co zakończy się w czasie późniejszym
  // Nie blokuje przeglądarki
  // Wydajniejsze, bardziej płynne działanie strony i interakcje użytkownika ze stroną/aplikacją
  // Pozwala na równoległe wykonanie operacji

  console.log('Before timeout');
  setTimeout(() => console.log('Timeout 1000'), 1000);
  setTimeout(() => console.log('Timeout 0'), 0);
  console.log('After timeout');

  // Przykłady operacji asynchronicznych:
  // - setTimeout i setInterval
  // - Oczekiwanie na odpowiedź serwera z treścią strony, plikiem, itp.

  // Problemy/wyzwania z obsługą błędów w kodzie asynchronicznym
  try {
    console.log('Trying something');
    setTimeout(() => {
      try {
        throw new Error('Coś poszło nie tak..');
      } catch (error) {
        console.log('Błąd setTimeout:', error.message);
      }
    }, 1000);
  } catch (error) {
    console.log('Złapałem błąd: ', error);
  }

  // -----------------------------------------------------------

  // @@ CALLBACK @@

  function iAmCallback(num) {
    console.log('Jestem callbackiem, wywołana z parametrem', num);
  }

  // Funkcja z callbackiem
  function handleOnClick(callback) {
    console.log('Wykorzystuję callback!');
    callback(sum + 10);
  }

  // ------------------------------------------------------------

  // @@ PROMISE @@

  // first example
  // fetchData funkcja do generowania promisów
  const fetchData = () => {
    // Zwracamy naszą obietnicę (Promise)
    return new Promise((resolve, reject) => {
      // resolve -> funkcja, którą wywołamy, gdy sukces
      // reject -> funkcja, którą wywołamy, gdy jakiś błąd
      setTimeout(() => {
        // Symulowanie zachowania serwera
        const data = { id: 1, name: 'Jan' };
        const err = Math.random() > 0.5 ? 'Błąd serwera' : null;
        if (err) {
          // Jeżeli błąd to odrzucamy Promise
          reject(err);
        }

        // Jeśli ok, to wywiązujemy się z Promise
        resolve(data);
      }, 1000);
    });
  };

  const handleFetchData = () => {
    fetchData().then(
      (data) => {
        console.log(`Dane użytkownika: ${JSON.stringify(data)}`);
      },
      (err) => {
        console.log(`Wystąpił błąd: ${err}`);
      }
    );
  };

  // Inny sposób wykorzystania promise
  const handleFetchData2 = () => {
    fetchData()
      .then((data) => {
        console.log(`Dane użytkownika: ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        console.log(`Wystąpił błąd: ${err}`);
      });
  };

  const resolvedPromise = Promise.resolve('Sukces');
  resolvedPromise
    .then((response) => {
      console.log(`Ex1: Resolved value: ${response}`);
    })
    .catch((err) => console.log(`Ex1: Rejected with ${err}`));

  const rejectedPromise = Promise.reject('Failure');
  rejectedPromise
    .then((response) => {
      console.log(`Ex2: Resolved value: ${response}`);
    })
    .catch((err) => console.log(`Ex2: Rejected with ${err}`));

  // Promises - states
  // 1. PENDING - stan początkowy, w którym Promise nie został jeszcze rozwiązany, ani odrzucony. Tylko w tym stanie, stan może ulec zmianie na FULFILLED lub REJECTED
  const handlePending = () => {
    const pendingPromise = new Promise((res, rej) => {});
    console.log('Pending Promise', pendingPromise);
  };

  // 2. FULFILLED - stan, w którym obietnica została rozwiązana. Stan nie może ulec zmianie
  const handleFulfilled = () => {
    const fulfilledPromise = new Promise((res, rej) => {
      setTimeout(() => {
        res('Sukces');
      }, 500);
    });
    fulfilledPromise.then(() =>
      console.log('Fulfilled Promise', fulfilledPromise)
    );
  };

  // 3. REJECTED - stan, w którym obietnica została odrzucona. Stan nie może ulec zmianie
  const handleRejected = () => {
    const rejectedPromise = new Promise((res, rej) => {
      setTimeout(() => {
        rej(new Error('Failure'));
      }, 500);
    });
    rejectedPromise
      .then(() => console.log('Rejected Promise', rejectedPromise))
      .catch((err) => console.log(`Błąd: ${err.message}`, rejectedPromise));
  };

  const promiseFunction = (size, delay) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        if (size > 20) {
          rej('Size too large, max 20!');
        } else {
          const arr = Array(size)
            .fill(0)
            .map((_, index) => index)
            .map((id) => <li key={id}>{id}</li>);
          res(arr);
        }
      }, delay);
    });

  const handleGetList = () => {
    promiseFunction(19, 1000)
      .then((result) => {
        setList(result);
        return 'Udało się';
      })
      .then((msg) => console.log(`Chained promise - ${msg}`))
      .catch((err) => console.log(`Błąd pobrania listy: ${err}`))
      .finally(console.log('Wyloguj użytkownika'));
  };

  return (
    <div>
      <h1>PromisesAndMe</h1>
      <h2>Intro</h2>
      {/* <p>Counter: {counter}</p> */}
      {/* <p onClick={raceCondition}>Race Condition</p> */}
      <button onClick={() => handleOnClick(setSum)}>
        Przycisk z callbackiem
      </button>
      <button
        style={{ marginLeft: '10px' }}
        onClick={() => handleOnClick(iAmCallback)}
      >
        Przycisk z callbackiem 2
      </button>
      <p>Suma: {sum}</p>
      <h2>Promise</h2>
      <p>
        Obiekt, który pozwala połączyć wykonanie asynchronicznej operacji z
        kodem oczekującym na jej zakończenie (wynik).
      </p>
      <button onClick={handleFetchData}>Fetch data </button>
      <button style={{ marginLeft: '10px' }} onClick={handleFetchData2}>
        Fetch data 2
      </button>
      <h3>Stany promisów</h3>
      <button onClick={handlePending}>PENDING</button>
      <button style={{ marginLeft: '10px' }} onClick={handleFulfilled}>
        FULFILLED
      </button>
      <button style={{ marginLeft: '10px' }} onClick={handleRejected}>
        REJECTED
      </button>
      <h2>Praktyka/Ćwiczenia</h2>
      <button onClick={handleGetList}>Pobierz listę</button>
      <p>Lista elementów:</p>
      <ul>{list}</ul>
    </div>
  );
};
