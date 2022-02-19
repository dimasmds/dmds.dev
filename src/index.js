import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// global styles
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
