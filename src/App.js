import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavBar from './components/NavBar';
import {Route} from 'react-router-dom';
import Quiz from './components/Quiz';




function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <NavBar />
        </Toolbar>
      </AppBar>
      
      <Route exact path="/quiz" component={Quiz} />
      
    </div>
  );
}

export default App;
