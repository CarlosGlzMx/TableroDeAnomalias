/* Renderizador inicial de React, llama a App */
/* TODO Cambiar a React 18, quitando ReactDOM */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);