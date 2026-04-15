import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { techTalks } from '../../../content';

function FeaturedTalks() {
  const featured = useMemo(() => {
    const shuffled = [...techTalks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  const [main, ...side] = featured;

  return (
    <section className="featured-talks">
      <div className="featured-talks__header">
        <h3 className="featured-talks__title">Tech Talks</h3>
        <span className="featured-talks__badge">LIVE</span>
      </div>
      <p className="featured-talks__subtitle">
        Sharing session tentang teknologi yang pernah saya deliver.
      </p>
      <div className="featured-talks__grid">
        {main && (
          <a
            className="featured-talks__main"
            href={`https://www.youtube.com/watch?v=${main.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="featured-talks__main-bg"
              src={`https://img.youtube.com/vi/${main.videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
            />
            <div className="featured-talks__main-thumb-wrapper">
              <img
                className="featured-talks__main-thumb"
                src={`https://img.youtube.com/vi/${main.videoId}/hqdefault.jpg`}
                alt={main.title}
                loading="lazy"
              />
            </div>
            <div className="featured-talks__main-overlay">
              <span className="featured-talks__play-icon">&#9654;</span>
              <span className="featured-talks__main-title">{main.title}</span>
            </div>
          </a>
        )}
        <div className="featured-talks__side">
          {side.map((talk) => (
            <a
              key={talk.videoId}
              className="featured-talks__side-item"
              href={`https://www.youtube.com/watch?v=${talk.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://img.youtube.com/vi/${talk.videoId}/mqdefault.jpg`}
                alt={talk.title}
                loading="lazy"
              />
              <span className="featured-talks__side-title">{talk.title}</span>
            </a>
          ))}
        </div>
      </div>
      <Link to="/talks" className="featured-talks__cta">
        Lihat semua video
        <span className="featured-talks__cta-arrow">&rarr;</span>
      </Link>
    </section>
  );
}

export default FeaturedTalks;
