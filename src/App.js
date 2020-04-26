import React from 'react';
import './App.css';
import Radio from './components/Radio.js';
import OpenQuestion from './components/OpenQuestion';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Login/>
        </Toolbar>
      </AppBar>
      <br/><br/><br/>
      <Radio />
      <br/><br/><br/>
      <OpenQuestion />
    </div>
  );
}

export default App;
