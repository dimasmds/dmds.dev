import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function Navigation(props) {
  const { title } = props;
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
}

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navigation;
