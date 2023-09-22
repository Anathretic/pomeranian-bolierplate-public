export function JsPrototypes() {
  function Person(name) {
    // kontekst danej funkcji
    this.name = name;
  }

  // nowa globalna metoda (zła praktyka)
  Person.prototype.SayHello = function () {
    console.log(`Hello, I'm ${this.name}.`);
  };

  const person1 = new Person('Konrad');

  person1.SayHello();

  // THIS!!!!!!!

  const person = {
    name: 'Maciej',
    sayHello: function () {
      return console.log(`Moje imię to ${this.name}`);
    },
  };

  person.sayHello();

  const user = {
    name: 'Ktoś',
    sayHello: person.sayHello,
  };

  user.sayHello();

  // BIND DO WIĄZANIA KONTEKSTU THIS / ZMIANY KONTEKSTU

  const bindSayHello = person.sayHello.bind(user);
  bindSayHello();

  // const arrowFunc = () => {
  //   console.log(`Hello ---> ${this.name}`);
  // };
  // arrowFunc();

  // const person3 = {
  //   name: 'Maciej',
  //   sayHello2: () => {
  //     return console.log(`Moje imię to ${this.name}`);
  //   },
  // };

  // person3.sayHello2();

  // OOP w JS (podejście obiektowe)
  class UniquePerson {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    sayHello() {
      return console.log(`Hello, my class name is ${this.name}`);
    }
    getAge() {
      return console.log(`Hello, my class age is ${this.age}`);
    }
  }

  const getClassName = new UniquePerson('Nie mam imienia', 55);
  getClassName.sayHello();
  getClassName.getAge();

  // call i apply

  function greetings(greeting) {
    return console.log(`${greeting} super ${this.name}`);
  }

  const data1 = { name: 'Maciej' };
  const data2 = { name: 'Dojlido' };

  greetings.call(data1, 'Hi');
  greetings.apply(data2, ['Hi']);

  return <div className="js-prototypes">JsPrototypes</div>;
}
