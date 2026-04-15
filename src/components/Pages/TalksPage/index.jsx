import React from 'react';
import './style.scss';
import Talks from '../../Pures/Talks';

function TalksPage() {
  return (
    <main className="talks-page">
      <h2 className="talks-page__title">Talks</h2>
      <p className="talks-page__subtitle">Sharing session tentang teknologi yang pernah saya deliver.</p>
      <Talks />
    </main>
  );
}

export default TalksPage;
