import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__card">
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__subtitle">Halaman yang kamu cari tidak ditemukan</h2>
        <p className="not-found__description">
          Mungkin halaman ini sudah dipindahkan, dihapus, atau memang tidak pernah ada.
          Atau mungkin kamu tersesat di internet?
        </p>
        <Link to="/" className="not-found__back-link">
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
