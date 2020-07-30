import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import shortid from 'shortid';
import {Top} from './components/Top';
import {Bottom} from './components/Bottom';
import {Hat} from './components/Hat';
import {Shoes} from './components/Shoes';

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

  // TODO: create new logo thing
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container className="container" maxWidth="sm">
          <Hat/>
          <Top/>
          <Bottom/>
          <Shoes/>
        </Container>
      </header>
    </div>
  );
}

export default App;
