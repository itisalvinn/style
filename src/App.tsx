import React from 'react';
import style from './style.png';
import './App.css';
import Container from '@material-ui/core/Container';
import {Top} from './components/Top';
import {Bottom} from './components/Bottom';
import {Hat} from './components/Hat';
import {Shoes} from './components/Shoes';

function App() {

  // TODO: create new logo thing
  return (
    <div className="App">
      <header className="App-header">
        <img src={style}/>
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
