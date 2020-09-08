import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// check whether targeting web or electron
const isElectron = require("is-electron");
const TARGET = isElectron() ? 'electron' : 'web';
const WEB = TARGET === 'web'
const ELECTRON = !WEB

if (ELECTRON) {
  // forward logs to electron's main thread
  const {createElectronHandler, registerLogHandler} = require('./logger');
  registerLogHandler(createElectronHandler('log-event'));

  // log versions
  console.log('Target:', TARGET);
  console.log('Electron', process.versions.electron);
  console.log('Chrome', process.versions.chrome);
  console.log('Node', process.versions.node);
}
else {
  // log versions
  console.log('Target:', TARGET);
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
