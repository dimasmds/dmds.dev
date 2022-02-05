import React from 'react';
import { socialMedias } from '../../../content';
import './style.scss';

function SocialMedias() {
  return (
    <ul className="social-medias">
      { socialMedias.map(({ name, icon, url }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noreferrer">
            <img src={icon} alt={name} />
          </a>
        </li>
      )) }
    </ul>
  );
}

export default SocialMedias;
