import React, { Component } from 'react';
import CafeContainer from './CafeContainer/CafeContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CafeContainer/>
        </header>
      </div>
    );
  }
}

export default App;
