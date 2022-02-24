import React from 'react';
import hljs from 'highlight.js';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { notebooks } from '../../../content';
import './style.scss';

function NotebookPage() {
  const { slug } = useParams();
  const [content, setContent] = React.useState('');

  const notebook = notebooks.find((item) => item.slug === slug);

  if (!notebook) {
    return <div>404</div>;
  }

  React.useEffect(async () => {
    const { content: notebookContent } = notebook;
    const response = await fetch(notebookContent);
    const text = await response.text();
    setContent(text);
    hljs.highlightAll();
  });

  if (content === '') {
    return <div />;
  }

  const { title } = notebook;

  return (
    <main className="notebook-detail">
      <header>
        <h2 className="notebook-detail__title">{title}</h2>
        <div className="notebook-detail__tags">
          {notebook.tags.map((tag) => (
            <span key={tag} className="notebook-detail__tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="markdown-body">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </main>
  );
}

export default NotebookPage;
