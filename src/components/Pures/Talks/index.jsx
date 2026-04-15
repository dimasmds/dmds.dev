import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { techTalks } from '../../../content';

function TalkCard({ talk }) {
  const { title, videoId } = talk;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a
      className="talk-card"
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="talk-card__thumbnail">
        <img src={thumbnailUrl} alt={title} loading="lazy" />
        <div className="talk-card__play">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <h4 className="talk-card__title">{title}</h4>
    </a>
  );
}

function Talks() {
  return (
    <div className="talks">
      {
        techTalks.map((talk) => (
          <TalkCard key={talk.videoId} talk={talk} />
        ))
      }
    </div>
  );
}

TalkCard.propTypes = {
  talk: PropTypes.shape({
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Talks;
