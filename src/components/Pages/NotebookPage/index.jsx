import React from 'react';
import hljs from 'highlight.js';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { notebooks } from '../../../content';
import PodcastPlayer from '../../Pures/PodcastPlayer';
import './style.scss';

function NotebookPage() {
  const { slug } = useParams();
  const [content, setContent] = React.useState('');
  const [hasPodcast, setHasPodcast] = React.useState(false);

  const notebook = notebooks.find((item) => item.slug === slug);

  if (!notebook) {
    return <div>404</div>;
  }

  const podcastSrc = notebook.content.replace(/\.md$/, '_podcast.mp3');

  React.useEffect(() => {
    (async () => {
      const { content: notebookContent } = notebook;
      const response = await fetch(notebookContent);
      const text = await response.text();
      setContent(text);
      hljs.highlightAll();

      // Check if podcast audio exists
      try {
        const podcastResp = await fetch(podcastSrc, { method: 'HEAD' });
        setHasPodcast(podcastResp.ok);
      } catch {
        setHasPodcast(false);
      }
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

  const { title, tags } = notebook;

  return (
    <main className={`notebook-detail${hasPodcast ? ' notebook-detail--with-player' : ''}`}>
      <header>
        <h2 className="notebook-detail__title">{title}</h2>
        <div className="notebook-detail__tags">
          {tags.map((tag) => (
            <span key={tag} className="notebook-detail__tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>

      {hasPodcast && <PodcastPlayer audioSrc={podcastSrc} />}
    </main>
  );
}

export default NotebookPage;
