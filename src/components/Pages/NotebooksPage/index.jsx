import React from 'react';
import './style.scss';
import Notebooks from '../../Pures/Notebooks';
import SEO from '../../Pures/SEO';

function NotebooksPage() {
  return (
    <main className="notebook-page">
      <SEO
        title="Notebooks"
        description="Secuil catatan yang perlu disimpan dan dibagikan - articles about software engineering, parenting, and life."
        url="https://dmds.dev/notebooks"
      />
      <h2 className="notebook-page__title">Notebooks</h2>
      <p className="notebook-page__subtitle">Secuil catatan yang perlu disimpan dan dibagikan.</p>
      <Notebooks />
    </main>
  );
}

export default NotebooksPage;
