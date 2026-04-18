import React from 'react';
import './style.scss';
import Talks from '../../Pures/Talks';
import SEO from '../../Pures/SEO';

function TalksPage() {
  return (
    <main className="talks-page">
      <SEO
        title="Tech Talks"
        description="Tech talks and developer coaching sessions by Dimas Maulana Dwi Saputra."
        url="https://dmds.dev/talks"
      />
      <h2 className="talks-page__title">Talks</h2>
      <p className="talks-page__subtitle">Sharing session tentang teknologi yang pernah saya deliver.</p>
      <Talks />
    </main>
  );
}

export default TalksPage;
