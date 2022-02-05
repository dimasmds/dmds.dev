import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Tag(props) {
  const { name, icon } = props;
  return (
    <div className="tag">
      <img className="tag__icon" src={icon} alt={name} />
      <p className="tag__name">{name}</p>
    </div>
  );
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Tag;
