import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';
import { notebooks } from '../../../content';

const convertDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
});

function NotebookItem({ notebook }) {
  const { date, slug, title } = notebook;
  return (
    <div className="notebook-item">
      <Link to={`/notebooks/${slug}`}>{title}</Link>
      <span>
        {convertDate(date)}
      </span>
    </div>

  );
}

function Notebooks() {
  return (
    <div className="notebooks">
      {
        notebooks.map((notebook) => (
          <NotebookItem key={notebook.slug} notebook={notebook} />
        ))
      }
    </div>
  );
}

NotebookItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notebook: PropTypes.object.isRequired,
};

export default Notebooks;
