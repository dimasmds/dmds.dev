import React from 'react';
import { useParams } from 'react-router-dom';
import { loadHighlightJs } from '../../../utils/highlight';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { notebooks } from '../../../content';
import AudioPlayer from '../../Pures/AudioPlayer';
import SEO from '../../Pures/SEO';
import RelatedArticles from '../../Pures/RelatedArticles';
import TableOfContents, { slugify } from '../../Pures/TableOfContents';
import { getRelatedArticles } from '../../../utils/relatedArticles';
import { readingTime } from '../../../utils/readingTime';
import './style.scss';

function extractHeadings(markdown) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  const usedIds = new Set();
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`~]/g, '').trim();
    let id = slugify(text);

    // Ensure unique IDs
    if (usedIds.has(id)) {
      let counter = 1;
      while (usedIds.has(`${id}-${counter}`)) {
        counter += 1;
      }
      id = `${id}-${counter}`;
    }
    usedIds.add(id);

    headings.push({ id, text, level });
  }

  return headings;
}

function NotebookPage() {
  const { slug } = useParams();
  const [content, setContent] = React.useState('');
  const [headings, setHeadings] = React.useState([]);
  const [hasAudio, setHasAudio] = React.useState(false);
  const [audioChecked, setAudioChecked] = React.useState(false);
  const markdownRef = React.useRef(null);

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
    // Reset state when slug changes
    setContent('');
    setHeadings([]);
    setHasAudio(false);
    setAudioChecked(false);

    // Scroll to top when navigating between articles
    window.scrollTo(0, 0);

    (async () => {
      const { content: notebookContent } = notebook;
      const response = await fetch(notebookContent);
      const text = await response.text();
      setContent(text);
      setHeadings(extractHeadings(text));
      await loadHighlightJs(text);

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
  }, [slug]);

  // Inject IDs into rendered headings after content renders
  React.useEffect(() => {
    if (!content || !markdownRef.current) return;

    const container = markdownRef.current;
    const headingEls = container.querySelectorAll('h2, h3');
    const usedIds = new Set();

    headingEls.forEach((el) => {
      const text = el.textContent.replace(/[*_`~]/g, '').trim();
      let id = slugify(text);

      if (usedIds.has(id)) {
        let counter = 1;
        while (usedIds.has(`${id}-${counter}`)) {
          counter += 1;
        }
        id = `${id}-${counter}`;
      }
      usedIds.add(id);
      el.id = id;
    });
  }, [content]);

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
  const estimatedReadingTime = readingTime(content);

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
        <div className="notebook-detail__reading-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{estimatedReadingTime}</span>
        </div>
      </header>

      {headings.length >= 3 && <TableOfContents headings={headings} />}

      <div className="markdown-body" ref={markdownRef}>
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
