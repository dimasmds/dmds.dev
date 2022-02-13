import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// global styles
import './styles/global.scss';
import './styles/markdown-style.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
