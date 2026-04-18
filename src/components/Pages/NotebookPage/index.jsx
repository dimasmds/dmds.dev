import React from 'react';
import hljs from 'highlight.js';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { notebooks } from '../../../content';
import AudioPlayer from '../../Pures/AudioPlayer';
import SEO from '../../Pures/SEO';
import RelatedArticles from '../../Pures/RelatedArticles';
import { getRelatedArticles } from '../../../utils/relatedArticles';
import './style.scss';

function NotebookPage() {
  const { slug } = useParams();
  const [content, setContent] = React.useState('');
  const [hasAudio, setHasAudio] = React.useState(false);
  const [audioChecked, setAudioChecked] = React.useState(false);

  const notebook = notebooks.find((item) => item.slug === slug);

  if (!notebook) {
    return <div>404</div>;
  }

  const audioSrc = notebook.content.replace(/\.md$/, '_audio.mp3');
  const canonicalUrl = `https://dmds.dev/notebooks/${slug}`;

  // Extract description from content (first 160 chars without markdown)
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/^#{1,6}\s+.*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  const metaDescription = plainText.length > 160
    ? `${plainText.substring(0, 157)}...`
    : plainText || notebook.title;

  React.useEffect(() => {
    (async () => {
      const { content: notebookContent } = notebook;
      const response = await fetch(notebookContent);
      const text = await response.text();
      setContent(text);
      hljs.highlightAll();

      // Check if audio overview exists
      try {
        const audioResp = await fetch(audioSrc, { method: 'HEAD' });
        const ct = audioResp.headers.get('content-type') || '';
        setHasAudio(audioResp.ok && ct.includes('audio'));
      } catch {
        setHasAudio(false);
      }
      setAudioChecked(true);
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
  const relatedArticles = getRelatedArticles(notebook, notebooks);

  return (
    <main className={`notebook-detail${hasAudio ? ' notebook-detail--with-player' : ''}`}>
      <SEO
        title={title}
        description={metaDescription}
        url={canonicalUrl}
        type="article"
        publishedTime={notebook.date}
        tags={tags}
      />
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

      {relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}

      {hasAudio && <AudioPlayer audioSrc={audioSrc} />}
      {audioChecked && !hasAudio && (
        <div className="notebook-detail__no-audio">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
          </svg>
          <span>Audio belum tersedia untuk artikel ini</span>
        </div>
      )}
    </main>
  );
}

export default NotebookPage;
