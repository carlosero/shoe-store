import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import actionCable from 'actioncable'

const WS_URL = 'ws://localhost:5000/cable';
const CableApp = {};
CableApp.cable = actionCable.createConsumer(WS_URL);
export const ActionCableContext = createContext();

ReactDOM.render(
  <React.StrictMode>
    <ActionCableContext.Provider value={CableApp.cable}>
      <App />
    </ActionCableContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
