import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const materialColorfulPallettes = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
];

function getRandomColor() {
  const index = Math.floor(Math.random() * materialColorfulPallettes.length);
  return materialColorfulPallettes[index];
}

function Tag(props) {
  const { name, icon: Icon } = props;
  return (
    <div className="tag">
      <div>
        <Icon style={{
          color: getRandomColor(),
        }}
        />
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
