import React from 'react';
import './style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import NotebooksPage from '../Pages/NotebooksPage';
import Navigation from '../Pures/Navigation';
import { navigation } from '../../content';
import NotebookPage from '../Pages/NotebookPage';

function App() {
  const { title } = navigation;

  return (
    <BrowserRouter>
      <Navigation title={title} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notebooks" element={<NotebooksPage />} />
        <Route path="/notebooks/:slug" element={<NotebookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
