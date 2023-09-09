import './styles.css';

// Named functions ------------------------------------------

// function sum(first, second) {
//   return first + second;
// }

// Funkcja anonimowa ----------------------------------------

// function (first, second) {
//   return first + second
// }

// Funkcja anonimowa - przykład

const result = [1, 5].map(function (item) {
  return item * 2;
});
console.log('Przykład funkcji anonimowej', result);

// Funkcja strzałkowa ---------------------------------------

const result2 = [1, 5, 3].map((item) => item * 2); // to samo co ((item) => { return item * 2})
console.log('Przykład funkcji strzałkowej', result2);

const numbers = (x, y) => x + y;
console.log('Drugi przykład funkcji strzałkowej', numbers(5, 10));

// Liczba parametrów ----------------------------------------
console.log('Miało być 30, ale jest błąd', numbers(15, 1, 5));
console.log('Za mało paramterów', numbers('Hello-'));

// Return --------------------------------------------------
let abc;
console.log('abc', abc);

const nothingInConsole = () => {
  console.log('Nic nie zwrócę');
  // return 'Zwracam coś'
};
console.log('nothingInConsole: ', nothingInConsole());

// Jak zwrócić obiekt w arrow function ---------------------
const returnObject = () => ({ hello: 'hello' });
console.log(returnObject());

// Rekurencja ----------------------------------------------
// addNumbersTo(1) = 1
// 1 step addNumbersTo(1) => return 1
// addNumbersTo(2) = 1 + 2
// 1 step addNumbersTo => return 2 + addNumbersTo(1)
// 2 step return 1
// return 2 + 1
// addNumbersTo(3) = 1 + 2 + 3 = 6
// 1 step addNumbersTo(3) => return 3 + addNumbersTo(2)
// 2 step addNumbersTo(2) => return 2 + addNumbersTo(1)
// 3 step addNumbersTo(1) => return 1
// return 2 + 1

// Rekurencja to funkcja, która wywołuje samą siebie

const addNumbersTo = (value) => {
  if (value === 1) return 1;
  return value + addNumbersTo(value - 1);
};
console.time('Rekurencja');
console.log('addNumbersTo(100)', addNumbersTo(10000));
console.timeEnd('Rekurencja');

// Bez rekurencji
const addNumbersToReduce = (value) =>
  Array(value)
    .fill(0)
    .reduce((prev, _, index) => prev + index + 1, 0);
console.time('Bez rekurencji - reduce');
console.log('addNumbersToReduce', addNumbersToReduce(10000));
console.timeEnd('Bez rekurencji - reduce');

// Argumenty funkcji ----------------------------------------
const multiSumSum = (multi, val1, val2) => {
  return multi * (val1 + val2);
};
console.log('multiSumSum', multiSumSum(2, 1, 1));
console.log('multiSumSum', multiSumSum(...[2, 1, 1]));
console.log('multiSumSum', multiSumSum(2, ...[1, 1]));

const multiSumSumMore = (multi, val1, val2, ...args) => {
  const sumArgs = args.reduce((prev, current) => prev + current, 0);
  return multi * (val1 + val2 + sumArgs);
};
console.log('multiSumSumMore', multiSumSumMore(2, 1, 1));
console.log('multiSumSumMore', multiSumSumMore(2, 1, 1, 1, 2));
console.log(
  'multiSumSumMore',
  multiSumSumMore(2, ...[1, 1, 1, 1, 1, 2, 3, 2, 2])
);

function multiSumSumNoArgs() {
  const [multi, val1, val2] = arguments; // w funkcji strzałkowej nie ma arguments, więc możliwe tylko użycie za pomocą function
  return multi * (val1 + val2);
}
console.log('multiSumSumNoArgs', multiSumSumNoArgs(2, 1, 1));

// Default arguments ---------------------------------------
const multiplyAdd = (val1, val2, addMe = 0) => val1 * val2 + addMe;
console.log('Multiply', multiplyAdd(2, 2));

// Referencja vs value && passing arguments to function ----
console.log('Liczba', 3);
const text1 = 'Hello'; // wartość
console.log('Tekst', text1);
const object1 = { name: 'Adam' }; // adres
console.log('Obiekt', object1);
let text2 = text1;
console.log('Wynik porównania wartości:', text1 === text2 && text1 === 'Hello');
console.log('Wynik porównania referencji: ', object1 === { name: 'Adam' });
const object0 = { name: 'Adam' };
console.log('Wynik porównania referencji: ', object1 === object0);
/// przykłady modyfikacji
text2 = 'Bey';
console.log('Warotść, po zmianie:', text2 === text1, text2, text1);
let object2 = object1;
console.log('Porównanie adresów/referencji:', object1 === object2);
object2.name = 'Paweł';
console.log('Po zmianie nadal to samo:', object1 === object2);
console.log('object1: ', object1);
const array1 = [];
const array2 = [];
console.log(array1 === array2);

const increaseFunction = (valueObj) => {
  valueObj.value = valueObj.value * 2;
  return valueObj.value;
};

let exampleValue = { value: 2 };
console.log(exampleValue);
console.log('exampleValue:', increaseFunction(exampleValue));
console.log(exampleValue);

// Zasięg zmiennych ---------------------------------------
const subtractValue = (val1, val2) => {
  const multi = 2;
  console.log(multi);
  return multi * (val1 - val2);
};
// console.log(multi) - out of scope
console.log('Odejmowanie', subtractValue(10, 1));

const addSomething = (value) => {
  return (innerValue) => innerValue + value;
};

const addToFive = addSomething(5);

console.log('addSomething', addToFive(5));
// Currying
console.log('addSomething', addSomething(5)(3));

export function JsFunctionBasics() {
  return (
    <div>
      <h1>Funkcje</h1>
      <h2>Rodzaje funkcji</h2>
      <h2>Liczba parametrów</h2>
      <h2>Return</h2>
      <h2>Rekurencja</h2>
      <h2>Argumenty/Parametry</h2>
      <h2>Default Arguments</h2>
      <h2>Referencja vs value && passing arguments to function</h2>
    </div>
  );
}
