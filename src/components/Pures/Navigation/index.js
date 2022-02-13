import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';
import { navigation } from '../../../content';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onDrawerButtonClick = this.onDrawerButtonClick.bind(this);
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

  render() {
    const { title } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <header className="header">
        <div className="header__container">
          <button
            type="button"
            className="header__drawer_button"
            onClick={this.onDrawerButtonClick}
          >
            ☰
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
                navigation.menus.map(({ name, url }) => (
                  <li key={name}>
                    <Link to={url}>{name}</Link>
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navigation;
