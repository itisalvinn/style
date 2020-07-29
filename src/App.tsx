import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from './TodoList';
import {AddTodoForm} from './AddTodoForm';
import {AllPieces} from './AllPieces';
import Container from '@material-ui/core/Container';
import shortid from 'shortid';

// some initial test data
const initialTodos: Todo[] = [
  {
    id: shortid.generate(),
    text: "leet code ",
    complete: false,
  },
  {
    id: shortid.generate(),
    text: "practice for interviews",
    complete: true,
  },
];

const initialPieces: Piece[] = [
  {
    type: "top",
  },
  {
    type: "bottom",
  },
];

function App() {
  // react hook
  const [todos, setTodos] = useState(initialTodos);

  // select a todo and toggle the complete prop
  // Array.map() calls provided function on every element in this array
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
  
  // new item 
  const addTodo: AddTodo = (text: string) => {
    const newTodo = {id: shortid.generate(), text, complete: false};
    setTodos([...todos, newTodo]);
  };

  const deleteItem: DeleteItem = (id: string) => {
    const removedItem = todos.filter(e => e.id != id);
    setTodos(removedItem);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container className="container" maxWidth="sm">
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteItem={deleteItem}/>
          <AddTodoForm addTodo={addTodo}/>
          <AllPieces todos={todos} toggleTodo={toggleTodo} deleteItem={deleteItem}/>
        </Container>
      </header>
    </div>
  );
}

export default App;
