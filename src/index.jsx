import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// global styles
import './styles/global.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
