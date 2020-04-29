import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Login from './components/Login';
import Questions from './components/Questions';
import NavBar from './components/NavBar';
import {Route} from 'react-router-dom';
import Answers from './components/Answers';



function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <NavBar />
        </Toolbar>
      </AppBar>
      
      <Route exact path="/login" component={Login} />
      <Route exact path="/questions" component={Questions} />
      <Route exact path="/answers" component={Answers} />
      
    </div>
  );
}

export default App;
