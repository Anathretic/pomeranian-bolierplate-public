import { ArraysTraining } from './ArraysTraining';
import './styles.css';

export function ComplexTypesInJs() {
  const personalData = {
    age: 60,
    name: 'Maciek',
    surname: 'Nowak',
  };

  const data = [
    'text', // string
    42, // number
    true, // boolean
    {
      keyOfObject: 'value', // object
    },
    [1, 2, 3], // array of arrays
  ];

  const arrayOfArrays = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const arrayOfString = ['audi', 'mercedes', 'tesla', 'bmw'];

  const [first, ...rest] = arrayOfString;

  const { age, name } = personalData;

  console.log(rest);

  const someArray = ['asdasd', 'dddddd', 'ssssss'];
  console.log([...someArray, 1]);

  const arrayOfObjects = [
    { name: 'Krzysztof' },
    { name: 'Oleg' },
    { name: 'Anna' },
  ];

  // Concat function example
  const concatResult = arrayOfString.concat(someArray);

  // Loops
  function forLoop() {
    for (let counter = 0; counter < 5; counter++) {
      console.log('For loop:', counter);
    }
  }

  const whileLoop = () => {
    let number = 0;

    while (number < 5) {
      console.log('While loop:', number);
      number++;
    }
  };

  // Infinity loop
  // while(true) {
  //   console.log(123123);
  // }

  return (
    <div className="container--exercise-js-complex-types">
      Tekst: {data[0]} <br />
      Property obiektu: {data[3].keyOfObject} <br />
      Element tablicy tablic: {data[4][2]} <br />
      <br />
      Core function (build in function pop()): {arrayOfArrays[0].pop()} <br />
      Core function (build in function shift()): {arrayOfArrays[0].shift()}
      <br />
      Destructuring of array: {`${first} - ${rest}`} <br />
      Destructuring of object: {`${name} - ${age}`} <br />
      <br />
      Splice example - elementy usunięte: {String([1, 2, 3].splice(1, 2))}
      <br />
      Slice example: {String([1, 2, 3, 4].slice(1, 3))}
      <br />
      Concat example: {concatResult.join(', ')}
      <br />
      Do I have this car? {arrayOfString.indexOf('tesla') !== -1 ? 'Yes' : 'No'}
      <br />
      Do I have this car?{' '}
      {arrayOfString.indexOf('polonez') === -1 ? 'No' : 'Yes'} <br />
      Length: {arrayOfString.length}
      {forLoop()}
      {whileLoop()}
      <ArraysTraining />
    </div>
  );
}
