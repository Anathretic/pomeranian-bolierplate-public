const userList = [
  { id: 1, name: 'Anna', age: 30 },
  { id: 2, name: 'Jan', age: 25 },
  { id: 3, name: 'Katarzyna', age: 35 },
  { id: 4, name: 'Piotr', age: 28 },
  { id: 5, name: 'Ewa', age: 32 },
];

export function ArraysTraining() {
  // Przykładowe użycie funkcji find() - znajdź użytkownika o określonym ID
  const foundUser = userList.find((user) => user.id === 3);

  // Przykładowe użycie funkcji filter() - filtruj użytkowników starszych niż 30 lat lub rownych 30 lat
  const filteredUsers = () => userList.filter((user) => user.age >= 30);

  // Przykładowe użycie funkcji sort() - sortuj użytkowników według wieku
  // const sortedUsers = [...userList].sort((a, b) => a.age - b.age);

  // Przykładowe użycie funkcji map - połącz imiona użytkowników w jedną ciąg znaków
  // const joinedNames = userList.map((user) => user.name);

  // Przykładowe użycie funkcji reduce() - oblicz średnią wieku użytkowników
  // const averageAge =
  //   userList.reduce((total, user) => total + user.age, 0) / userList.length;

  // console.log(sortedUsers);

  // how to extract particular char from string
  const text = 'Javascript';
  console.log(text[0]);
  console.log(text[1]);
  console.log(text[2]);

  const newUserList = { ...userList };
  console.log('newUserList', newUserList);
  userList[0].name = 'You changed my name';
  console.log('userList', userList);

  // Powyższy problem (shallow copy) można rozwiązać za pomocą structuredClone <- nowa metoda, lub map + spread

  // Object.assign
  const object1 = { a: 1, b: 2 };
  const object2 = { c: 3, d: 4 };
  const object3 = Object.assign({}, object1, object2); // Łączy obiekt1 i obiekt2 w nowy obiekt3

  console.log(object3);

  // Object.entries
  const object4 = { a: 1, b: 2, c: 3 };
  const values = Object.entries(object4);
  console.log(values);

  // Object.values
  const object5 = { a: 1, b: 2, c: 3 };
  const values2 = Object.values(object5);
  console.log(values2);

  // Object.keys
  const object6 = { a: 1, b: 2, c: 3 };
  const keys = Object.keys(object6);
  console.log(keys);

  return (
    <div className="container--arrays-training">
      <h1>Przykład funkcji wbudowanych w JS: </h1>
      <p>Znalezionu uzytkownik: {foundUser.name}</p>
      <p>
        Uzytkownicy starsi lub równi 30 lat:{' '}
        {filteredUsers()
          .map((user) => user.name)
          .join(', ')}
      </p>
    </div>
  );
}
