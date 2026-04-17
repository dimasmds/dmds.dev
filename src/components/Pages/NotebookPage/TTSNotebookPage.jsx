import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { splitSentences } from '../../Pures/TTSPlayer';
import '../../Pures/TTSPlayer/style.scss';
import './highlight.scss';

const HIGHLIGHT_CLASS = 'tts-highlight';

function TTSNotebookPage({ content, title, tags }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sentences, setSentences] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [lang, setLang] = useState('id');
  const spanRefs = useRef({});
  const topRef = useRef(null);

  const LANG_MAP = { id: 'id-ID', en: 'en-US' };

  const detectLanguage = useCallback((text) => {
    const sample = text.slice(0, 500).toLowerCase();
    const idWords = ['yang', 'dengan', 'untuk', 'dari', 'ini', 'itu', 'dalam', 'pada', 'adalah', 'tidak', 'akan', 'kita', 'saya', 'mereka', 'seperti', 'tetapi', 'karena', 'oleh', 'bisa', 'sudah', 'lebih', 'belum'];
    const enWords = ['the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was', 'will', 'have', 'has', 'not', 'but', 'which', 'their', 'been', 'they', 'its', 'can'];

    let idScore = 0;
    let enScore = 0;
    idWords.forEach((w) => { if (sample.includes(w)) idScore += 1; });
    enWords.forEach((w) => { if (sample.includes(` ${w} `) || sample.includes(` ${w}.`) || sample.includes(` ${w},`)) enScore += 1; });

    return idScore >= enScore ? 'id' : 'en';
  }, []);

  useEffect(() => {
    const detected = detectLanguage(content);
    setLang(detected);
    setSentences(splitSentences(content));
  }, [content, detectLanguage]);

  const getVoice = useCallback((targetLang) => {
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find((v) => v.lang === targetLang);
    if (!voice) {
      const prefix = targetLang.split('-')[0];
      voice = voices.find((v) => v.lang.startsWith(prefix));
    }
    return voice || voices[0] || null;
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveIndex(-1);
  }, []);

  const speakSentence = useCallback((index) => {
    if (index >= sentences.length) {
      stop();
      return;
    }

    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = rate;
    const targetLang = LANG_MAP[lang];
    const voice = getVoice(targetLang);
    if (voice) utterance.voice = voice;
    utterance.lang = targetLang;

    utterance.onstart = () => {
      setActiveIndex(index);
      // Scroll into view
      const el = spanRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    utterance.onend = () => {
      speakSentence(index + 1);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        console.error('TTS error:', e.error);
        stop();
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [sentences, lang, rate, getVoice, stop]);

  const handlePlay = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    stop();
    setIsPlaying(true);
    speakSentence(0);
  }, [isPaused, speakSentence, stop]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    stop();
  }, [stop]);

  const handleLangToggle = useCallback(() => {
    const newLang = lang === 'id' ? 'en' : 'id';
    setLang(newLang);
    if (isPlaying || isPaused) stop();
  }, [lang, isPlaying, isPaused, stop]);

  const handleRateChange = useCallback((newRate) => {
    setRate(newRate);
    if (isPlaying || isPaused) {
      stop();
      setIsPlaying(true);
      speakSentence(activeIndex >= 0 ? activeIndex : 0);
    }
  }, [activeIndex, isPlaying, isPaused, speakSentence, stop]);

  const progress = sentences.length > 0 && activeIndex >= 0
    ? Math.round((activeIndex / sentences.length) * 100)
    : 0;

  // Build a flat text map: sentence index -> { start, end } in the full content
  // We need to map sentences back to positions in the raw markdown for highlighting
  const sentencePositions = React.useMemo(() => {
    const positions = [];
    let searchOffset = 0;
    sentences.forEach((sentence) => {
      // Find the sentence in the content (strip leading whitespace for matching)
      const trimmed = sentence.trim();
      const idx = content.indexOf(trimmed, searchOffset);
      if (idx >= 0) {
        positions.push({ start: idx, end: idx + trimmed.length });
        searchOffset = idx + trimmed.length;
      }
    });
    return positions;
  }, [sentences, content]);

  // Split content into parts around sentences, with each sentence wrapped in a span
  const highlightedContent = React.useMemo(() => {
    if (sentencePositions.length === 0) return content;

    const parts = [];
    let lastEnd = 0;

    sentencePositions.forEach((pos, idx) => {
      // Text before this sentence
      if (pos.start > lastEnd) {
        parts.push({ type: 'text', value: content.slice(lastEnd, pos.start) });
      }
      // The sentence itself
      parts.push({ type: 'sentence', value: content.slice(pos.start, pos.end), index: idx });
      lastEnd = pos.end;
    });

    // Remaining text after last sentence
    if (lastEnd < content.length) {
      parts.push({ type: 'text', value: content.slice(lastEnd) });
    }

    return parts;
  }, [sentencePositions, content]);

  // Custom paragraph renderer that handles highlighting
  const components = {
    p: ({ children, ...props }) => {
      // Get the text content of this paragraph
      const text = extractText(children);
      const posInParagraph = findSentenceInText(text, sentencePositions, content);

      if (posInParagraph.length === 0) {
        return <p {...props}>{children}</p>;
      }

      return (
        <p {...props}>
          {renderHighlightedText(text, posInParagraph, activeIndex, spanRefs)}
        </p>
      );
    },
    li: ({ children, ...props }) => {
      const text = extractText(children);
      const posInParagraph = findSentenceInText(text, sentencePositions, content);

      if (posInParagraph.length === 0) {
        return <li {...props}>{children}</li>;
      }

      return (
        <li {...props}>
          {renderHighlightedText(text, posInParagraph, activeIndex, spanRefs)}
        </li>
      );
    },
  };

  return (
    <main className="notebook-detail" ref={topRef}>
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

      {'speechSynthesis' in window && (
        <div className="tts-player">
          <div className="tts-player__controls">
            {!isPlaying && !isPaused ? (
              <button
                type="button"
                className="tts-player__btn tts-player__btn--play"
                onClick={handlePlay}
                title="Putar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              <>
                {isPlaying && (
                  <button
                    type="button"
                    className="tts-player__btn tts-player__btn--pause"
                    onClick={handlePause}
                    title="Jeda"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </button>
                )}
                {isPaused && (
                  <button
                    type="button"
                    className="tts-player__btn tts-player__btn--resume"
                    onClick={handlePlay}
                    title="Lanjut"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  className="tts-player__btn tts-player__btn--stop"
                  onClick={handleStop}
                  title="Berhenti"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h12v12H6z" />
                  </svg>
                </button>
              </>
            )}

            <div className="tts-player__progress">
              <div className="tts-player__progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <span className="tts-player__counter">
              {activeIndex >= 0
                ? `${Math.min(activeIndex + 1, sentences.length)}/${sentences.length}`
                : `${sentences.length} kalimat`}
            </span>

            <button
              type="button"
              className="tts-player__btn tts-player__btn--lang"
              onClick={handleLangToggle}
              title={`Bahasa: ${lang === 'id' ? 'Indonesia' : 'English'}`}
            >
              {lang === 'id' ? 'ID' : 'EN'}
            </button>

            <div className="tts-player__speed">
              {[0.75, 1, 1.25, 1.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`tts-player__btn tts-player__btn--speed${rate === r ? ' tts-player__btn--active' : ''}`}
                  onClick={() => handleRateChange(r)}
                  title={`Kecepatan ${r}x`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </main>
  );
}

// Helper: extract plain text from React children
function extractText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children?.props?.children) return extractText(children.props.children);
  return '';
}

// Helper: find which sentence positions fall within a given text
function findSentenceInText(text, positions, fullContent) {
  const result = [];
  const textStart = fullContent.indexOf(text);
  if (textStart < 0) return result;

  const textEnd = textStart + text.length;

  positions.forEach((pos, idx) => {
    if (pos.start >= textStart && pos.end <= textEnd) {
      result.push({
        index: idx,
        start: pos.start - textStart,
        end: pos.end - textStart,
      });
    }
  });

  return result;
}

// Helper: render text with highlighted sentences
function renderHighlightedText(text, positions, activeIndex, spanRefs) {
  if (positions.length === 0) return text;

  const parts = [];
  let lastEnd = 0;

  positions.forEach((pos) => {
    if (pos.start > lastEnd) {
      parts.push(text.slice(lastEnd, pos.start));
    }
    const isActive = pos.index === activeIndex;
    parts.push(
      <span
        key={pos.index}
        ref={(el) => { spanRefs.current[pos.index] = el; }}
        className={isActive ? 'tts-highlight tts-highlight--active' : 'tts-highlight'}
      >
        {text.slice(pos.start, pos.end)}
      </span>
    );
    lastEnd = pos.end;
  });

  if (lastEnd < text.length) {
    parts.push(text.slice(lastEnd));
  }

  return parts;
}

TTSNotebookPage.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TTSNotebookPage;
