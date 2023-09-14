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

  // Dla tablicy imion
  function nameMarks(names, ...letters) {
    let data = [];
    let overall = [0];

    const output = {};

    names.map((name) => {
      for (const { letter, score } of letters) {
        output[letter] ??= 0;
        output[letter] += score;

        if (name.toUpperCase().includes(letter)) {
          overall.push(score);
        }
      }

      const sumIt = overall.reduce(
        (accValue, currValue) => accValue + currValue,
        0
      );

      const result = {
        name: name,
        score: sumIt,
      };
      data.push(result);
      overall = [0];
    });

    data.sort((x, y) => (x.score < y.score ? 1 : x.score > y.score ? -1 : 0));

    return JSON.stringify(data);
  }

  nameMarks(
    [
      'Ewelina',
      'Agnieszka',
      'Jan',
      'Iga',
      'Katarzyna',
      'Anna',
      'Klaudia',
      'Maria',
    ],
    ...arr
  );

  // Dla tablicy imion - sposób trenera
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
        <p>
          Wynik:{' '}
          <code>
            {nameMarks(
              [
                'Ewelina',
                'Agnieszka',
                'Jan',
                'Iga',
                'Katarzyna',
                'Anna',
                'Klaudia',
                'Maria',
              ],
              ...arr
            )}
          </code>
        </p>
      </section>
    </article>
  );
};
