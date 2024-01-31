import React from 'react';
import './style.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p>
          Copyright ©
          { new Date().getFullYear() }
          {' '}
          Dimas Maulana Dwi Saputra
        </p>
      </div>
      <div className="footer__design-inspired">
        <p>
          Design inspired by
          {' '}
          <a href="https://showwcase.com" target="_blank" rel="noreferrer">Showwcase</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
