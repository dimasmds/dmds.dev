import React from 'react';
import { personalInformation } from '../../../content';

import './style.scss';
import Tags from '../Tags';

function PersonalInformation() {
  const {
    pictureUrl,
    name,
    mention,
    location,
    currentJob,
    description,
  } = personalInformation;

  const {
    role,
    at,
  } = currentJob;
  return (
    <header className="personal-information">
      <img
        className="personal-information__image-profile"
        src={pictureUrl}
        alt={`${name} profile`}
      />
      <h2 className="personal-information__name">{name}</h2>
      <p className="personal-information__mini_info">
        <div>
          <span>{`@${mention}`}</span>
        </div>
        <div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </span>
        </div>
        <div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            {`${role} at `}
            {' '}
            <strong>{at}</strong>
          </span>
        </div>
      </p>
      <p className="personal-information__description">{description}</p>
      <Tags />
    </header>
  );
}

export default PersonalInformation;
