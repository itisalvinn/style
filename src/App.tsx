import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from './TodoList';
import {AddTodoForm} from './AddTodoForm';
import Container from '@material-ui/core/Container';

const initialTodos: Todo[] = [
  {
    text: "leet code ",
    complete: false,
  },
  {
    text: "practice for interviews",
    complete: true,
  },
];

function App() {
  // react hook
  const [todos, setTodos] = useState(initialTodos);

  // select a todo and toggle the complete prop
  // Array.map() calls provided function on every element in this array
  // arrow function syntax => no return but sets the todo w/ newTodos
  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo){
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  
  // new todo 
  const addTodo: AddTodo = (text: string) => {
    const newTodo = {text, complete: false};
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container className="container" maxWidth="sm">
          <TodoList todos={todos} toggleTodo={toggleTodo}/>
          <AddTodoForm addTodo={addTodo}/>
        </Container>
      </header>
    </div>
  );
}

export default App;
