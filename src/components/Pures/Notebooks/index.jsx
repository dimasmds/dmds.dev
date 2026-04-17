import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';
import { notebooks } from '../../../content';

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  return {
    key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
    label: `${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`,
  };
};

const groupByMonth = (items) => {
  const groups = [];
  let currentGroup = null;

  items.forEach((notebook) => {
    const { key, label } = getMonthYear(notebook.date);

    if (!currentGroup || currentGroup.key !== key) {
      currentGroup = { key, label, items: [] };
      groups.push(currentGroup);
    }
    currentGroup.items.push(notebook);
  });

  return groups;
};

const getAllTags = (items) => {
  const tagSet = new Set();
  items.forEach((n) => (n.tags || []).forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
};

function NotebookItem({ notebook, activeTag, onTagClick }) {
  const { date, slug, title, tags } = notebook;
  return (
    <div className="notebook-item">
      <div className="notebook-item__main">
        <Link to={`/notebooks/${slug}`}>{title}</Link>
        {tags && tags.length > 0 && (
          <div className="notebook-item__tags">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`notebook-item__tag${activeTag === tag ? ' notebook-item__tag--active' : ''}`}
                onClick={(e) => { e.preventDefault(); onTagClick(tag); }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="notebook-item__date">
        {new Date(date).getDate()}
      </span>
    </div>
  );
}

NotebookItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notebook: PropTypes.object.isRequired,
  activeTag: PropTypes.string,
  onTagClick: PropTypes.func.isRequired,
};

NotebookItem.defaultProps = {
  activeTag: null,
};

function Notebooks() {
  const [activeTag, setActiveTag] = useState(null);

  const allTags = getAllTags(notebooks);
  const filtered = activeTag
    ? notebooks.filter((n) => (n.tags || []).includes(activeTag))
    : notebooks;
  const groups = groupByMonth(filtered);

  return (
    <div className="notebooks">
      {activeTag && (
        <div className="notebooks__filter">
          <span className="notebooks__filter-label">
            Filter:
          </span>
          <button
            type="button"
            className="notebooks__filter-active"
            onClick={() => setActiveTag(null)}
          >
            {activeTag}
            <span className="notebooks__filter-close">&times;</span>
          </button>
        </div>
      )}
      {groups.length === 0 && (
        <p className="notebooks__empty">Tidak ada artikel dengan tag ini.</p>
      )}
      {groups.map((group) => (
        <div key={group.key} className="notebook-group">
          <h3 className="notebook-group__label">{group.label}</h3>
          {group.items.map((notebook) => (
            <NotebookItem
              key={notebook.slug}
              notebook={notebook}
              activeTag={activeTag}
              onTagClick={setActiveTag}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Notebooks;
