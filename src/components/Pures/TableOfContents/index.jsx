import React from 'react';
import './style.scss';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function TableOfContents({ headings }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState('');

  React.useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    // Small delay to ensure headings are rendered with IDs
    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headings]);

  if (!headings || headings.length < 3) return null;

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <div className="table-of-contents">
      {/* Desktop version */}
      <div className="toc-desktop">
        <div className="toc-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Daftar Isi</span>
        </div>
        <nav className="toc-nav">
          {headings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`toc-link toc-link--level-${level}${activeId === id ? ' toc-link--active' : ''}`}
              onClick={(e) => handleClick(e, id)}
            >
              {text}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile version */}
      <div className="toc-mobile">
        <button
          className="toc-toggle"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Daftar Isi</span>
          <svg
            className={`toc-chevron${isOpen ? ' toc-chevron--open' : ''}`}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {isOpen && (
          <nav className="toc-nav toc-nav--mobile">
            {headings.map(({ id, text, level }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`toc-link toc-link--level-${level}${activeId === id ? ' toc-link--active' : ''}`}
                onClick={(e) => handleClick(e, id)}
              >
                {text}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export { TableOfContents, slugify };
export default TableOfContents;
