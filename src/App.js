import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
import React, { useState, useEffect } from 'react';

const APIKey = 'a5eab9-be8a8b-bbe10e-268159-1f3d4e';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://cse204.work/todos', {
      headers: {
        'x-api-key': APIKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (a.isComplete && !b.isComplete) {
            return 1; // a is checked, so move it down the list
          } else if (!a.isComplete && b.isComplete) {
            return -1; // b is checked, so move it down the list
          } else {
            return 0; // no need to change order
          }
        });
        setTodos(sortedData);
      })
      .catch((error) => console.error(error));
  }, []);

  const addTask = (input) => {
    const newTask = { text: input, isComplete: false };
    console.log("addTask called");
    fetch('https://cse204.work/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKey,
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTask = { ...newTask, id: data.id };
        setTodos((todos) => [...todos, updatedTask]);
        console.log("addTask worked");
      })
      .catch((error) => {
        console.error('Error adding task:', error);
        // TODO: Show error message to user
      });
  };
  

  const completeTask = (id, isComplete) => {
    const updatedTodo = {
      ...todos.find((todo) => todo.id === id),
      isComplete: !isComplete,
    };
  
    fetch(`https://cse204.work/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKey,
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id ? { ...todo, isComplete: data.isComplete } : todo
          )
        );
      })
      .catch((error) => console.error(error));
  };
  
  
  
  

  const deleteTask = (id) => {
    fetch(`https://cse204.work/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKey,
      },
    })
      .then(() => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">Sara's TODO App</header>
      <section id="myTodos"></section>
      <section id="todos">
        <NewTodo addTask={addTask}/> 
        {todos.map((todo) => (
          <Todo
          key={todo.id}
          todo={todo}
          completeTask={() => completeTask(todo.id, todo.isComplete)}
          deleteTask={() => deleteTask(todo.id)}
          completed={todo.isComplete} // change to todo.isComplete
        />
        ))}
      </section>
    </div>
  );}
      export default App;

        





