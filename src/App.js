import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Quiz from './components/Quiz';






function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          
        </Toolbar>
      </AppBar>
      
      <Quiz/>

      
      
    </div>
  );
}

export default App;
