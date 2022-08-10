import React from 'react';
import { socialMedias } from '../../../content';
import './style.scss';

function SocialMedias() {
  return (
    <ul className="social-medias">
      { socialMedias.map(({ name, icon: Icon, url }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noreferrer">
            <Icon />
          </a>
        </li>
      )) }
    </ul>
  );
}

export default SocialMedias;
