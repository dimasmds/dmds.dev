import React from 'react';
import './style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import NotebookPage from '../Pages/NotebookPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notebook" element={<NotebookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
