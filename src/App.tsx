import React from 'react';
import style from './images/style.png';
import './App.css';
import Container from '@material-ui/core/Container';
import {Top} from './components/Top';
import {Bottom} from './components/Bottom';
import {Hat} from './components/Hat';
import {Shoes} from './components/Shoes';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={style} className="App-logo"/>
        <Container className="container" maxWidth="sm">
          <Hat/>
          <Top/>
          <Bottom/>
          <Shoes/>
        </Container>
      </header>
      <a>
        created by alvin 
      </a>
    </div>
  );
}

export default App;
