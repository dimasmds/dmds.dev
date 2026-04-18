import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
};

function RelatedArticles({ articles }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="related-articles">
      <h3 className="related-articles__heading">Artikel Terkait</h3>
      <nav className="related-articles__list">
        {articles.map((article) => (
          <article key={article.slug} className="related-articles__card">
            <Link to={`/notebooks/${article.slug}`} className="related-articles__link">
              <span className="related-articles__title">{article.title}</span>
            </Link>
            <span className="related-articles__date">{formatDate(article.date)}</span>
            {article.tags && article.tags.length > 0 && (
              <div className="related-articles__tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="related-articles__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </nav>
    </section>
  );
}

export default RelatedArticles;
