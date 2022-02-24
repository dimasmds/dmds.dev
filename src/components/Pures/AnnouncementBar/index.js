import React from 'react';

import './style.scss';

const fetchNowPlaying = async (callback) => {
  const response = await fetch('/.netlify/functions/now-playing-spotify');

  if (response.status === 200) {
    const data = await response.json();
    callback(data);
  }
};

function AnnouncementBar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(async () => {
    await fetchNowPlaying(setData);

    setInterval((async () => {
      await fetchNowPlaying(setData);
    }), 180000);
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
        <img src="/assets/images/icons/social-media/spotify.png" alt="Spotify Logo" title="Currently playing" />
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
