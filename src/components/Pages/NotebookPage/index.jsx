import React from 'react';
import hljs from 'highlight.js';
import { useParams } from 'react-router-dom';
import { notebooks } from '../../../content';
import TTSNotebookPage from './TTSNotebookPage';

function NotebookPage() {
  const { slug } = useParams();
  const [content, setContent] = React.useState('');

  const notebook = notebooks.find((item) => item.slug === slug);

  if (!notebook) {
    return <div>404</div>;
  }

  React.useEffect(() => {
    (async () => {
      const { content: notebookContent } = notebook;
      const response = await fetch(notebookContent);
      const text = await response.text();
      setContent(text);
      hljs.highlightAll();
    })();
  }, []);

  // Show skeleton while loading
  if (content === '') {
    return (
      <main className="notebook-detail skeleton-loading">
        <header>
          <div className="skeleton skeleton__title" />
          <div className="notebook-detail__tags">
            <div className="skeleton skeleton__tag" />
            <div className="skeleton skeleton__tag" />
            <div className="skeleton skeleton__tag" />
          </div>
        </header>
        <div className="markdown-body skeleton-content">
          <div className="skeleton skeleton__paragraph skeleton__paragraph--long" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--long" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--medium" />
          <div className="skeleton skeleton__block" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--long" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--medium" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--short" />
          <div className="skeleton skeleton__block" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--long" />
          <div className="skeleton skeleton__paragraph skeleton__paragraph--medium" />
        </div>
      </main>
    );
  }

  return (
    <TTSNotebookPage
      content={content}
      title={notebook.title}
      tags={notebook.tags}
    />
  );
}

export default NotebookPage;
