export const Block22Warmup = () => {
  const arr = [
    { letter: 'A', score: 5 },
    { letter: 'E', score: 15 },
    { letter: 'I', score: 6 },
    { letter: 'O', score: 2 },
    { letter: 'U', score: 0 },
  ];

  // Zadanie 1 ----------------------------------------
  function concatArr(...args) {
    let newArray = [];
    for (const arg of args) {
      if (!Array.isArray(arg)) {
        console.log('Zły parametr');
        return;
      } else {
        newArray = newArray.concat(arg);
      }
    }
    return newArray;
  }
  console.log(concatArr([1, 2], [3, 4]));

  // Zadanie 2 -----------------------------------------

  // Dla 1 imienia - do przeróbki dla 2
  function nameMarks(val1, ...val2) {
    let overall = 0;
    const output = {};
    const test = () => {
      for (const { letter, score } of val2) {
        output[letter] ??= 0;
        output[letter] += score;
  
        if (val1.toUpperCase().includes(letter)) {
          overall += score;
        } else {
          console.log(false);
        }
      }
    }
    // val1.map((test) => test.test())
    console.log({ name: val1, score: overall });
  }

  nameMarks(['Ewelina'], ...arr);

  // Dla tablicy imion
  const getWeight = (letter, wagi) => {
    const found = wagi.find((w) => w.letter === letter);
    return found ? found.score : 0;
  };

  const calculateScore = (name, wagi) => {
    return [...name].reduce(
      (prev, letter) => prev + getWeight(letter, wagi),
      0
    );
  };

  const imionaWagi = (imiona, wagi) => {
    const result = imiona.map((name) => ({
      name: name,
      score: calculateScore(name.toUpperCase(), wagi),
    }));
    return JSON.stringify(result);
  };

  imionaWagi(['Ewa', 'Anna'], arr);

  return (
    <article>
      <h1>Rozgrzewka przed blokiem 22</h1>
      <section>
        <h2>Zadanie 1</h2>
        <p>
          napisz funkcję, która przyjmuje niezliczoną ilość argumentów - muszą
          to być tablice. Na przykład{' '}
        </p>
        <p>
          funkcja zwraca jedną tablicę z elementami wszystkich tablic podanych w
          argumencie.
        </p>
        <p>
          <code>
            concatArr([1, 2, 3], [4, 5], [8]) wynik [1, 2, 3, 4, 5, 8]
          </code>
        </p>
        <p>
          <code>concatArr([1, 2, 3], [4, 5], 'text') wynik "zły parametr"</code>
        </p>
      </section>
      <section>
        <h2>Zadanie 2</h2>
        <p>
          stwórz jako funkcję która przyjmuje 2 argumenty imiona oraz
          wagę/punktację.
        </p>
        <p>
          Zwraca posortowaną tablice imion z dodanym parametrem sumaWag
          niemutujaca oryginalnej
        </p>
        <p>
          <code>const wagi = {JSON.stringify(arr)}</code>
        </p>
        <p>
          <code>{`imionaWagi(["Janek", "Zosia"], wagi)`}</code>
        </p>
        <p>
          wynik{' '}
          <code>{`[{name: "janek", score: 20}, {name:
"zosia", score: 13}]`}</code>
        </p>
      </section>
    </article>
  );
};
