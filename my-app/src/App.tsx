import React, { useState } from 'react';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);


  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //avoid to reload 
    e.preventDefault();

    //create new todo
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //display checkbox 
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    //filter 関数
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todo list with typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="create" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
                <input 
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                //input value into blank
                value={todo.inputValue}
                //disabled conect with handkeChecked 
                disabled={todo.checked}
              />
              <input 
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
