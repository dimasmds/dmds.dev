import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function PodcastPlayer({ audioSrc }) {
  return (
    <div className="podcast-player">
      <div className="podcast-player__inner">
        <div className="podcast-player__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
          </svg>
          <span>Audio</span>
        </div>
        <audio controls preload="metadata" className="podcast-player__audio">
          <source src={audioSrc} type="audio/mpeg" />
          Browser tidak mendukung audio player.
        </audio>
      </div>
    </div>
  );
}

PodcastPlayer.propTypes = {
  audioSrc: PropTypes.string.isRequired,
};

export default PodcastPlayer;
