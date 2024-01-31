import React, { useContext, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode, MdMenu } from 'react-icons/md';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';

import { navigation } from '../../../content';
import AnnouncementBar from '../AnnouncementBar';
import ThemeContext from '../../../contexts/ThemeContext';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function Navigation(props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(() => window.location.pathname.split('/')[1] || 'home');

  const { theme, toggleTheme } = useContext(ThemeContext);

  const onCloseButtonClick = () => setIsDrawerOpen(false);
  const onDrawerButtonClick = () => setIsDrawerOpen(true);
  const onNavigationClick = ({ target }) => {
    setIsDrawerOpen(false);
    setActiveMenu(target.innerText.toLowerCase());
  };

  const { title } = props;

  return (
    <div className="header">
      <header>
        <div className="header__container">
          <button
            type="button"
            className="header__drawer_button"
            onClick={onDrawerButtonClick}
          >
            <MdMenu />
          </button>
          <h1 className="header__title">{title}</h1>
          <nav className={`header__navigation_drawer ${isDrawerOpen ? 'open' : ''}`}>
            <button
              type="button"
              onClick={onCloseButtonClick}
              className="header__navigation_drawer_close"
            >
              ×
            </button>
            <ul>
              {
                navigation.menus.map(({
                  name,
                  url,
                }) => (
                  <li key={name}>
                    <Link to={url} onClick={onNavigationClick} className={activeMenu === name ? 'active' : ''}>{capitalizeFirstLetter(name)}</Link>
                  </li>
                ))
              }
              <li>
                <button type="button" onClick={toggleTheme}>{theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <AnnouncementBar />
    </div>
  );
}

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navigation;
