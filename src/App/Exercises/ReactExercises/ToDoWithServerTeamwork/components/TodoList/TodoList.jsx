import { TodoItem } from '../TodoItem/TodoItem';
import './style.css';

export const TodoList = ({ setShowForm, data, setEditObject, getData }) => {
  const handleAddButton = () => {
    setShowForm(true);
  };

  return (
    <div className="todo-list-wrapper">
      <div className="heading">
        <h4>Tutaj znajdziesz listę swoich zadań.</h4>
        <button className="add-button" onClick={handleAddButton}>
          +
        </button>
      </div>
      <div>
        {data.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            setEditObject={setEditObject}
            setShowForm={setShowForm}
            getData={getData}
          />
        ))}
      </div>
      <div>
        <button onClick={handleAddButton}>Dodaj</button>
      </div>
    </div>
  );
};
