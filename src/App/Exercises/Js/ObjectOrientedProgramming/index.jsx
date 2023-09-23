export function ObjectOrientedProgramming() {
  // Klasa
  class Car {
    speed = 0;
    // Poniżej przykład STATIC !!!!!
    static passenger;
    // -----------------------

    constructor(speed, passenger) {
      this.speed = speed;
      this.passenger = passenger;
    }

    showSpeed() {
      console.log(`Prędkość maks. wynosi ${this.speed} km/h.`);
    }

    // Poniżej przykład STATIC !!!!!
    static passengersAmount() {
      console.log(`Liczba pasażerów to ${this.passenger}.`);
    }
    // -----------------------
  }

  // Instancja klasy
  const fastCar = new Car(300);
  const slowCar = new Car(160);

  fastCar.showSpeed();
  slowCar.showSpeed();

  // Poniżej przykład STATIC !!!!!
  Car.passenger = 5;
  Car.passengersAmount();
  // ------------------------

  // Operator instanceof
  console.log(`fastCar instanceof Car: ${fastCar instanceof Car}`);
  class NotACar {}
  console.log(`fastCar instanceof Car: ${fastCar instanceof NotACar}`);

  // --------------------------------------------------------------------

  // Polimorfizm
  // Zdolność różnych klas do reagowania/wykonania metody o tej samej nazwie w różny sposób

  class AnimalPoli {
    speak() {
      console.log('Animal makes a noise!');
    }
  }

  class DogPoli extends AnimalPoli {
    speak() {
      console.log('Dog barks!');
    }
  }
  const dogPoli = new DogPoli();
  // dogPoli.speak();

  class CatPoli extends AnimalPoli {
    speak() {
      console.log('Cat meows!');
    }
  }
  const catPoli = new CatPoli();
  // catPoli.speak();

  class CowPoli extends AnimalPoli {}
  const cowPoli = new CowPoli();

  const animals = [dogPoli, catPoli, fastCar, cowPoli];
  animals.forEach((animal) => {
    if (animal instanceof AnimalPoli) {
      animal.speak();
    }
  });

  // Dziedziczenie cd.
  // klasa nadrzędna
  class AnimalParent {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  // klasa podrzędna
  class DogChildren extends AnimalParent {
    bark() {
      return 'hał';
    }

    speak() {
      console.log(`${this.getName()} barks ${this.bark()}!`);
    }
  }

  const dog = new DogChildren('Reksio');
  dog.speak();

  // Hermetyzajca
  class AnimalPrivate {
    // prywatne property
    #counter = 0;
    #name = '';
    constructor(name) {
      this.#name = name;
    }
    getName() {
      this.#counter += 1;
      console.log(`Name is: ${this.#name}, was called ${this.#counter} times.`);
    }
    #resetCounter() {
      this.#counter = 0;
    }

    setName(newName) {
      this.#name = newName;
      this.#resetCounter();
    }
  }

  const privateAnimal = new AnimalPrivate('Reksio');
  privateAnimal.getName();
  privateAnimal.getName();
  privateAnimal.getName();
  // privateAnimal.#counter = 0 -> nie zadziała
  privateAnimal.setName('Max');
  privateAnimal.getName();
  privateAnimal.getName();

  // Kompozycja - tworzenie bardziej złożonych obiektów poprzez składanie ich z innych komponentów/obiektów

  // przykład z dziedziczeniem
  class AnimalInherit {
    speak() {
      console.log('Animal makes a noise!');
    }
  }

  class DogInherit extends AnimalInherit {
    speak() {
      console.log('Dog barks');
    }
  }
  const dogInherit = new DogInherit();
  dogInherit.speak();

  //poprzez kompozycję
  class SpeakerComposition {
    constructor(sound) {
      this.sound = sound;
    }
    makeSound() {
      console.log(this.sound);
    }
  }
  
  class DogComposition {
    constructor() {
      this.speaker = new SpeakerComposition('hał');
    }

    bark() {
      this.speaker.makeSound();
    }
  }
  const dogComposition = new DogComposition();
  dogComposition.bark();

  return (
    <div>
      <h1 style={{ textDecoration: 'underline' }}>Klasy i OOP</h1>
      <h2>Paradygmaty programowania</h2>
      <ul>
        <li>Programowanie strukturalne</li>
        <li>Programowanie funkcjonalne</li>
        <li>Programowanie obiektowe</li>
      </ul>
      <h2>Object Oriented Programming</h2>
      <ul>
        <li>Abstrakcja</li>
        <li>Hermetyzacja</li>
        <li>Polimorfizm</li>
        <li>Dziedziczenie</li>
        <li>Kompozycja</li>
      </ul>
    </div>
  );
}
