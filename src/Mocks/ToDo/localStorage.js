import { testData } from './testData';

const localStorageName = 'todo-api';

export const getFromLocalStorage = () => {
  const storedData = localStorage.getItem(localStorageName);
  return storedData ? JSON.parse(storedData) : testData;
};

export const getToDo = (id) => {
  return getFromLocalStorage().find((data) => data?.id === id);
};

const saveToLocalStorage = (data) => {
  localStorage.setItem(localStorageName, JSON.stringify(data));
};

export const editLocalStorage = (callback) => {
  const data = getFromLocalStorage();
  const newData = callback(data);
  saveToLocalStorage(newData);
  return newData;
};

export const addToDo = (todo) => {
  const newData = editLocalStorage((data) => {
    const { id } = data.reduce(
      (prev, current) => (prev?.id > current?.id ? prev : current),
      { id: 0 }
    );
    const newId = id + 1;
    const newToDo = {
      ...todo,
      id: newId,
      createdAt: new Date().toISOString(),
      isDone: false,
    };
    console.log('ADD', newId, newToDo);
    data.push(newToDo);
    return data;
  });
  return newData.reduce((prev, current) =>
    prev?.id > current?.id ? prev : current
  );
};

export const deleteToDo = (id) => {
  editLocalStorage((data) => data.filter((todo) => todo?.id !== id));
};

export const markAsDone = (id) => {
  const newData = editLocalStorage((data) =>
    data.map((todo) =>
      todo?.id !== id
        ? todo
        : { ...todo, isDone: true, doneDate: new Date().toISOString() }
    )
  );
  return newData.find((todo) => todo.id === id);
};

export const updateToDo = (id, newTodo) => {
  const newData = editLocalStorage((data) =>
    data.map((todo) => (todo?.id !== id ? todo : { ...todo, ...newTodo }))
  );
  return newData.find((todo) => todo?.id === id);
};
