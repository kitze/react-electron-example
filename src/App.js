import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const remote = window.require('electron').remote;
const appVersion = remote.app.getVersion();

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React + Electron = <span role="img" aria-label="love">😍</span></h2>
        </div>
        <p className="App-intro">
         Version: {appVersion}
        </p>
      </div>
    );
  }
}

export default App;
