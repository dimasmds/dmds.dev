import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import NotebooksPage from '../Pages/NotebooksPage';
import Navigation from '../Pures/Navigation';
import { navigation } from '../../content';
import NotebookPage from '../Pages/NotebookPage';
import Footer from '../Pures/Footer';
import './style.scss';
import ThemeContext from '../../contexts/ThemeContext';

function App() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  const { title } = navigation;

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="app-container" data-theme={theme}>
        <BrowserRouter>
          <Navigation title={title} />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/notebooks" element={<NotebooksPage />} />
              <Route path="/notebooks/:slug" element={<NotebookPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
