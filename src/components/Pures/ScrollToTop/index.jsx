import React, { useState, useEffect, useCallback } from 'react';
import './style.scss';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [rafId, setRafId] = useState(null);

  const handleScroll = useCallback(() => {
    if (rafId) return;

    const id = requestAnimationFrame(() => {
      setVisible(window.scrollY > 400);
      setRafId(null);
    });
    setRafId(id);
  }, [rafId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleScroll, rafId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 4L3 11H7V16H13V11H17L10 4Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

export default ScrollToTop;
