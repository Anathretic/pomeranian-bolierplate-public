import { useState } from 'react';
import { RequestHandler } from '../../helpers';

export const TodoItem = ({ item, setEditObject, setShowForm, getData }) => {
  const [itemError, setItemError] = useState();

  const handleEdit = () => {
    const { id, title, author, note } = item;
    setEditObject({ id, title, author, note });
    setShowForm(true);
  };

  const handleDelete = () => {
    const { id } = item;
    RequestHandler('DELETE', id)
      .then(() => {
        getData();
      })
      .catch(() => setItemError(`Wystąpił błąd!`));
  };

  const handleMarkAsDone = () => {
    const { id } = item;
    RequestHandler('PUT', `${id}/markAsDone`)
      .then(() => {
        getData();
      })
      .catch(() => setItemError(`Wystąpił błąd!`));
  };

  return (
    <div>
      <div>
        <h5>{item.title}</h5>
        <p>{item.author}</p>
        <p>{item.createdAt}</p>
        <p>{item.note}</p>
      </div>
      <div>
        {item.isDone && <span>{item.doneDate}</span>}
        {!item.isDone && <button onClick={handleMarkAsDone}>Mark</button>}
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
