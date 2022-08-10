import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { navigation } from '../../../content';
import AnnouncementBar from '../AnnouncementBar';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      activeMenu: window.location.pathname.split('/')[1] || 'home',
    };

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onDrawerButtonClick = this.onDrawerButtonClick.bind(this);
    this.onNavigationClick = this.onNavigationClick.bind(this);
  }

  onCloseButtonClick() {
    this.setState({
      isDrawerOpen: false,
    });
  }

  onDrawerButtonClick() {
    this.setState({
      isDrawerOpen: true,
    });
  }

  onNavigationClick({ target }) {
    this.setState(() => ({
      isDrawerOpen: false,
      activeMenu: target.innerText.toLowerCase(),
    }));
  }

  render() {
    const {
      title,
    } = this.props;

    const { isDrawerOpen, activeMenu } = this.state;

    return (
      <div className="header">
        <header>
          <div className="header__container">
            <button
              type="button"
              className="header__drawer_button"
              onClick={this.onDrawerButtonClick}
            >
              <MdMenu />
            </button>
            <h1 className="header__title">{title}</h1>
            <nav className={`header__navigation_drawer ${isDrawerOpen ? 'open' : ''}`}>
              <button
                type="button"
                onClick={this.onCloseButtonClick}
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
                      <Link to={url} onClick={this.onNavigationClick} className={activeMenu === name ? 'active' : ''}>{capitalizeFirstLetter(name)}</Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </div>
        </header>
        <AnnouncementBar />
      </div>
    );
  }
}

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navigation;
