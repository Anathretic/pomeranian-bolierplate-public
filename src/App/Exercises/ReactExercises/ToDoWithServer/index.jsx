import { useState, useEffect } from 'react';
import { RequestHandler } from './helpers';

import './style.css';

// IT'S OWN VERSION OF EXERCISE SO IT WON'T BE REFACTORED LIKE TEAMWORK TO REMEMBER OF DIFFERENT SOLUTIONS

export const TodoWithServer = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState('');
  const [appStatus, setAppStatus] = useState(true);

  const [values, setValues] = useState({
    title: '',
    author: '',
    note: '',
  });

  const handleValue = (e, key) => {
    setValues({
      ...values,
      [key]: e.target.value,
    });
  };

  const clearInputs = () => {
    setValues({
      title: '',
      author: '',
      note: '',
    });
    setError('');
  };

  const fetchTodos = () => {
    RequestHandler('GET')
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        setError('fetch');
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const deleteTodo = (id) => {
    RequestHandler('DELETE', id)
      .then(() => {
        setError('');
        fetchTodos();
      })
      .catch(() => setError(`todo-${id}`));
  };

  const finishedTodo = (id) => {
    RequestHandler('PUT', `${id}/markAsDone`)
      .then(() => {
        setError('');
        fetchTodos();
      })
      .catch(() => setError(`todo-${id}`));
  };

  const editTodo = async (id) => {
    RequestHandler('PUT', id, values)
      .then(() => {
        clearInputs();
        setEdit(false);
        fetchTodos();
      })
      .catch(() => setError('post'));
  };

  const addTodo = (e) => {
    e.preventDefault();
    RequestHandler('POST', '', values)
      .then(() => {
        clearInputs();
        setForm(false);
        fetchTodos();
      })
      .catch(() => setError('post'));
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
                    e.preventDefault();
                    editTodo(todo.id);
                  }}
                >
                  <div className="form-container">
                    <label htmlFor="title">Tytuł</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={todo.title}
                      onChange={(e) => handleValue(e, 'title')}
                      required
                    />
                  </div>
                  <div className="form-container">
                    <label htmlFor="note">Treść</label>
                    <textarea
                      name="note"
                      defaultValue={todo.note}
                      onChange={(e) => handleValue(e, 'note')}
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
                      <div className="todo-container" key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p>{todo.note}</p>
                        <p>{todo.author}</p>
                        {todo.isDone ? (
                          <>
                            <button disabled>Finished</button>
                            <button onClick={() => deleteTodo(todo.id)}>
                              Delete
                            </button>
                            <span>{todo.doneDate}</span>
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
                    name="title"
                    onChange={(e) => handleValue(e, 'title')}
                    required
                  />
                </div>
                <div className="form-container">
                  <label htmlFor="author">Autor</label>
                  <input
                    type="text"
                    name="author"
                    onChange={(e) => handleValue(e, 'author')}
                    required
                  />
                </div>
                <div className="form-container">
                  <label htmlFor="note">Treść</label>
                  <textarea
                    name="note"
                    onChange={(e) => handleValue(e, 'note')}
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
