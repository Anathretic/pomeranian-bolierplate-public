import { useEffect, useState } from 'react';

import './style.css';

import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { RequestHandler } from './helpers';

export const TodoWithServerTeamwork = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editObject, setEditObject] = useState();

  const getData = () => {
    setLoading(true);
    setError(false);

    RequestHandler('GET')
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return 'Wystąpił błąd..';
  }

  if (loading) {
    return 'Ładowanie..';
  }

  if (showForm) {
    return (
      <TodoForm
        setShowForm={setShowForm}
        getData={getData}
        setEditObject={setEditObject}
        editObject={editObject}
      />
    );
  }

  return (
    <TodoList
      setShowForm={setShowForm}
      data={data}
      setEditObject={setEditObject}
      getData={getData}
    />
  );
};
