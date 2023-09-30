import { useState, useEffect } from 'react';

import './style.css';

export const TodoWithServer = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState(0);
  const [appStatus, setAppStatus] = useState(true);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newNote, setNewNote] = useState('');

  const clearInputs = () => {
    setNewTitle('');
    setNewAuthor('');
    setNewNote('');
    setError('');
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
    } catch (error) {
      console.log(error);
      setError('fetch');
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Nie udało się ukończyć!');
      }
      setError('');
      fetchTodos();
    } catch (error) {
      console.log(error);
      setError(`todo-${id}`);
    }
  };

  const finishedTodo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/todo/${id}/markAsDone`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Nie udało się ukończyć!');
      }
      setError('');
      fetchTodos();
    } catch (error) {
      console.log(error);
      setError(`todo-${id}`);
    }
  };

  const editTodo = async (id) => {
    const title = newTitle;
    const note = newNote;

    try {
      const response = await fetch(`http://localhost:3333/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, note }),
      });
      if (!response.ok) {
        throw new Error('Nie udało się ukończyć!');
      }
      clearInputs();
      setEdit(false);
      fetchTodos();
    } catch (error) {
      console.log(error);
      setError('post');
    }
  };

  const addTodo = async (e) => {
    const title = newTitle;
    const author = newAuthor;
    const note = newNote;

    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          note,
        }),
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd, spróbuj ponownie!');
      }

      clearInputs();
      setForm(false);
      fetchTodos();
    } catch (error) {
      console.log(error);
      setError('post');
    }
  };

  useEffect(() => {
    if (appStatus) {
      setError('');
      setAppStatus(false);
      fetchTodos();
    }
  }, [appStatus]);

  if (loading) {
    return <p>Ładowanie..</p>;
  }

  if (edit) {
    return (
      <>
        <h1>Edycja zadania</h1>
        <p>{edit}</p>
        {todos.map(
          (todo) =>
            todo.id === edit && (
              <div key={todo.id}>
                <form
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault(), editTodo(todo.id);
                  }}
                >
                  <div className="form-container">
                    <label htmlFor="title">Tytuł</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={todo.title}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-container">
                    <label htmlFor="note">Treść</label>
                    <textarea
                      name="note"
                      id="note"
                      cols="30"
                      rows="10"
                      defaultValue={todo.note}
                      onChange={(e) => setNewNote(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  {error === 'post' && (
                    <p style={{ color: 'red' }}>
                      Wystąpił błąd, spróbuj ponownie!
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      clearInputs();
                      setEdit(false);
                    }}
                  >
                    Cofnij
                  </button>
                  <button type="submit">Zapisz</button>
                </form>
              </div>
            )
        )}
      </>
    );
  }

  return (
    <>
      {error === 'fetch' ? (
        <div>
          <h1>Tutaj znajdziesz listę swoich zadań</h1>
          <p>Przepraszamy. Nie udało się pobrać listy zadań..</p>
          <button
            onClick={() => {
              setAppStatus(true);
            }}
          >
            Odśwież widok
          </button>
        </div>
      ) : (
        <div>
          {!form && (
            <div>
              <h1>Tutaj znajdziesz listę swoich zadań</h1>
              {todos.length === 0 && (
                <div>
                  <p>
                    Brawo! Nie masz aktualnie żadnych zadań do zrealizowania.
                  </p>
                  <button onClick={() => setForm(true)}>Dodaj zadanie</button>
                </div>
              )}
              {todos.length > 0 && (
                <div>
                  <div className="header-container">
                    <button onClick={() => setForm(true)}>+</button>
                  </div>
                  <section>
                    {todos.map((todo) => (
                      <div className='todo-container' key={Math.random()}>
                        <h2>{todo.title}</h2>
                        <p>{todo.note}</p>
                        <p>{todo.author}</p>
                        {todo.isDone ? (
                          <>
                            <button disabled>Finished</button>
                            <button onClick={() => deleteTodo(todo.id)}>
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => finishedTodo(todo.id)}>
                              Done
                            </button>
                            <button onClick={() => setEdit(todo.id)}>
                              Edit
                            </button>
                            <button onClick={() => deleteTodo(todo.id)}>
                              Delete
                            </button>
                          </>
                        )}
                        {error === `todo-${todo.id}` && (
                          <p style={{ color: 'red' }}>Nie udało się ukończyć</p>
                        )}
                        <p>Todo ID: {todo.id}</p>
                      </div>
                    ))}
                  </section>
                </div>
              )}
            </div>
          )}
          {form && (
            <>
              <h1>Dodawanie zadania</h1>
              <form className="form" onSubmit={addTodo}>
                <div className="form-container">
                  <label htmlFor="title">Tytuł</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-container">
                  <label htmlFor="author">Autor</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="form-container">
                  <label htmlFor="note">Treść</label>
                  <textarea
                    name="note"
                    id="note"
                    cols="30"
                    rows="10"
                    onChange={(e) => setNewNote(e.target.value)}
                    required
                  ></textarea>
                </div>
                {error === 'post' && (
                  <p style={{ color: 'red' }}>
                    Wystąpił błąd, spróbuj ponownie!
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    clearInputs();
                    setForm(false);
                  }}
                >
                  Cofnij
                </button>
                <button type="submit">Dodaj</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
