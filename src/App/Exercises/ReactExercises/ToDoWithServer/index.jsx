import { useState, useEffect } from 'react';

const testPost = {
  title: 'Tytuł',
  note: 'Notka',
  author: 'Autor',
};

export const TodoWithServer = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteTodos = async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd usuwania zasobu!');
      }

      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const postTodos = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPost),
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd wysyłania zasobu!');
      }

      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/todo');

      if (!response.ok) {
        throw new Error('Wystąpił błąd pobierania listy!');
      }

      const jsonData = await response.json();
      setTodos(jsonData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <p>Ładowanie..</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>To jest lista todos!</h1>
      <button onClick={postTodos}>Dodaj nowe zadanie</button>
      <section>
        {todos.map((todo) => (
          <div key={Math.random()}>
            <h2>{todo.title}</h2>
            <p>{todo.note}</p>
            <p>{todo.author}</p>
            <button onClick={() => deleteTodos(todo.id)}>Delete</button>
            <p>{todo.id}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
