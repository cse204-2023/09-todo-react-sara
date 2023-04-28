import React from "react";
import './Todo.css'
const Todo = ({ todo, completeTask, deleteTask, completed }) => {
  const handleComplete = () => {
    completeTask(todo.id, todo.isComplete);
  };

  const handleDelete = () => {
    deleteTask(todo.id);
  };

  return (
    <li id={todo.id} className={completed ? "completed" : null}>
      <input type="checkbox" checked={todo.isComplete} onChange={handleComplete} />
      <button onClick={handleDelete}>Delete</button>
      <p>{todo.text}</p>
    </li>
  );
};

export default Todo;
