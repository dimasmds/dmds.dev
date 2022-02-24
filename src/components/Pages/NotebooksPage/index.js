import React from 'react';
import './style.scss';
import Notebooks from '../../Pures/Notebooks';

function NotebooksPage() {
  return (
    <div className="page-container">
      <main className="notebook-page">
        <h2 className="notebook-page__title">Notebooks</h2>
        <p className="notebook-page__subtitle">Secuil catatan yang perlu disimpan dan dibagikan.</p>
        <Notebooks />
      </main>
    </div>
  );
}

export default NotebooksPage;
