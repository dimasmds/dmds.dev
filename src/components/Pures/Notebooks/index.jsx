import React from 'react';
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

function NotebookItem({ notebook }) {
  const { date, slug, title, tags } = notebook;
  return (
    <div className="notebook-item">
      <div className="notebook-item__main">
        <Link to={`/notebooks/${slug}`}>{title}</Link>
        {tags && tags.length > 0 && (
          <div className="notebook-item__tags">
            {tags.map((tag) => (
              <span key={tag} className="notebook-item__tag">{tag}</span>
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

function Notebooks() {
  const groups = groupByMonth(notebooks);

  return (
    <div className="notebooks">
      {groups.map((group) => (
        <div key={group.key} className="notebook-group">
          <h3 className="notebook-group__label">{group.label}</h3>
          {group.items.map((notebook) => (
            <NotebookItem key={notebook.slug} notebook={notebook} />
          ))}
        </div>
      ))}
    </div>
  );
}

NotebookItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notebook: PropTypes.object.isRequired,
};

export default Notebooks;
