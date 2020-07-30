import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AllPieces} from './components/AllPieces';
import Container from '@material-ui/core/Container';
import shortid from 'shortid';

// some initial test data
const initialTodos: Item[] = [
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

function App() {
  // react hook -- removed need for initial todo
  const [items, setItems] = useState<Item[]>([]);
  const [tops, setTops] = useState<Item[]>([]);
  const [bottoms, setBottoms] = useState<Item[]>([]);
  const [hats, setHats] = useState<Item[]>([]);

  // select a todo and toggle the complete prop
  // Array.map() calls provided function on every element in this array
  let toggleItem: ToggleItem = (selectedItem: Item, type: string) => {

    let newItems = items.map(item => {
      if (item === selectedItem){
        return {
          ...item,
          complete: !item.complete,
        };
      }
      return item;
    });
    setItems(newItems);
  };
  
  // new item 
  let addItem: AddItem = (text: string) => {
    let newItem = {id: shortid.generate(), text, complete: false};
    setItems([...items, newItem]);
  };

  // remove item
  let deleteItem: DeleteItem = (id: string) => {
    let removedItem = items.filter(e => e.id != id);
    setItems(removedItem);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container className="container" maxWidth="sm">
          <AllPieces items={items} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="top"/>
          <AllPieces items={items} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="bottom"/>
        </Container>
      </header>
    </div>
  );
}

export default App;
