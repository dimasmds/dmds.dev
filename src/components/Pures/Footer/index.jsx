import React from 'react';
import './style.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__copyright">
          <p>
            &copy;
            {' '}
            { new Date().getFullYear() }
            {' '}
            Dimas Maulana Dwi Saputra
          </p>
        </div>
        <div className="footer__design-inspired">
          <p>
            Built with
            {' '}
            <span className="footer__heart">React</span>
            {' '}
            &
            {' '}
            <a href="https://www.neobrutalism.dev" target="_blank" rel="noreferrer">Neobrutalism</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
