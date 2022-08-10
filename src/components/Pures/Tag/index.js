import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Tag(props) {
  const { name, icon: Icon } = props;
  return (
    <div className="tag">
      <div>
        <Icon />
        <p className="tag__name">{name}</p>
      </div>

    </div>
  );
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

export default Tag;
