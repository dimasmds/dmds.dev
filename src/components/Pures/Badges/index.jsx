import React from 'react';
import PropTypes from 'prop-types';
import { badges } from '../../../content';

import './style.scss';

function Badge({ name, image, link }) {
  return (
    <div className="badge">
      <a href={link} target="_blank" rel="noreferrer" title={name}><img src={image} alt={name} /></a>
    </div>
  );
}

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

function Badges() {
  return (
    <div className="badges">
      <h3>Badges/Certificates</h3>
      <div className="badges__list">
        {badges.map(({ name, image, link }) => (
          <Badge key={name} name={name} image={image} link={link} />
        ))}
      </div>
    </div>
  );
}

export default Badges;
