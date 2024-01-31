import React from 'react';
import { FaSpotify } from 'react-icons/fa';

import './style.scss';

async function fetchNowPlaying() {
  const response = await fetch('/.netlify/functions/now-playing-spotify');

  if (response.status === 200) {
    return response.json();
  }

  throw new Error('failed to fetch data');
}

function AnnouncementBar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchNowPlaying().then(setData);

    const interval = setInterval(() => {
      fetchNowPlaying().then(setData);
    }, 180000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onButtonCloseClick = () => {
    setIsOpen(false);
  };

  if (!data) {
    return (
      <>
      </>
    );
  }

  const {
    data: {
      artist,
      track,
      url,
    },
  } = data;

  return (
    <div className={`announcement-bar ${isOpen ? '' : 'close'}`}>
      <div className="announcement-bar__content">
        <FaSpotify title="Now playing on spotify" />
        <p>
          <a href={url} target="_blank" rel="noreferrer" title="Currently playing">
            {track}
            {' '}
            by
            {' '}
            {artist}
          </a>
        </p>
      </div>
      <button type="button" onClick={onButtonCloseClick}>X</button>
    </div>
  );
}

export default AnnouncementBar;
