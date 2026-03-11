import React from 'react';
import PropTypes from 'prop-types';
import { badges } from '../../../content';
import Marquee from '../Marquee';

import './style.scss';

function Badge({ name, image, link }) {
  return (
    <div className="badge">
      <a href={link} target="_blank" rel="noreferrer" title={name}>
        <img src={image} alt={name} />
        <span className="badge__name">{name}</span>
      </a>
    </div>
  );
}

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const firstRow = badges.slice(0, 4);
const secondRow = badges.slice(4);

function Badges() {
  return (
    <div className="badges">
      <h3>Badges/Certificates</h3>
      <div className="badges__showcase">
        <div className="badges__row">
          <Marquee speed={40}>
            {firstRow.map(({ name, image, link }) => (
              <Badge key={name} name={name} image={image} link={link} />
            ))}
          </Marquee>
        </div>
        <div className="badges__row">
          <Marquee speed={35} reverse>
            {secondRow.map(({ name, image, link }) => (
              <Badge key={name} name={name} image={image} link={link} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default Badges;
