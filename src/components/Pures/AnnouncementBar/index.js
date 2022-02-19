import React from 'react';

import './style.scss';

function AnnouncementBar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('/.netlify/functions/now-playing-spotify');

      if (response.status === 200) {
        const json = await response.json();
        setData(json);
      }
    })();
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

  const { data: { artist, track, url } } = data;

  return (
    <div className={`announcement-bar ${isOpen ? '' : 'close'}`}>
      <div className="announcement-bar__content">
        <img src="/assets/images/icons/social-media/spotify.png" alt="Spotify Logo" />
        <p>
          Currently playing
          {' '}
          <a href={url} target="_blank" rel="noreferrer">
            { track }
            {' '}
            by
            {' '}
            { artist }
          </a>
          {' '}
          on Spotify
        </p>
      </div>
      <button type="button" onClick={onButtonCloseClick}>X</button>
    </div>
  );
}

export default AnnouncementBar;
