import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const LANG_MAP = {
  id: 'id-ID',
  en: 'en-US',
};

const detectLanguage = (text) => {
  const sample = text.slice(0, 500).toLowerCase();
  const idWords = ['yang', 'dengan', 'untuk', 'dari', 'ini', 'itu', 'dalam', 'pada', 'adalah', 'tidak', 'akan', 'kita', 'saya', 'mereka', 'seperti', 'tetapi', 'karena', 'oleh', 'bisa', 'sudah', 'lebih', 'belum'];
  const enWords = ['the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was', 'will', 'have', 'has', 'not', 'but', 'which', 'their', 'been', 'they', 'its', 'can'];

  let idScore = 0;
  let enScore = 0;

  idWords.forEach((w) => { if (sample.includes(w)) idScore += 1; });
  enWords.forEach((w) => { if (sample.includes(` ${w} `) || sample.includes(` ${w}.`) || sample.includes(` ${w},`)) enScore += 1; });

  return idScore >= enScore ? 'id' : 'en';
};

const splitSentences = (text) => {
  // Split on sentence-ending punctuation, keeping the delimiter
  const raw = text.match(/[^.!?。]+[.!?。]+[\s]*/g) || [text];
  return raw.map((s) => s.trim()).filter((s) => s.length > 0);
};

const getVoice = (lang) => {
  const voices = window.speechSynthesis.getVoices();
  const targetLang = LANG_MAP[lang];

  // Try exact match first
  let voice = voices.find((v) => v.lang === targetLang);
  if (voice) return voice;

  // Try partial match
  const prefix = lang === 'id' ? 'id' : 'en';
  voice = voices.find((v) => v.lang.startsWith(prefix));
  if (voice) return voice;

  // Fallback: default voice
  return voices[0] || null;
};

function TTSPlayer({ content }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const [lang, setLang] = useState('id');
  const [rate, setRate] = useState(1);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const sentencesRef = useRef([]);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) setVoicesLoaded(true);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    const detected = detectLanguage(content);
    setLang(detected);
    sentencesRef.current = splitSentences(content);
  }, [content]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentenceIndex(-1);
    utteranceRef.current = null;
  }, []);

  const speakSentence = useCallback((index) => {
    if (index >= sentencesRef.current.length) {
      stop();
      return;
    }

    const sentence = sentencesRef.current[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = rate;
    const voice = getVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.lang = LANG_MAP[lang];

    utterance.onend = () => {
      setCurrentSentenceIndex(index + 1);
      speakSentence(index + 1);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        console.error('TTS error:', e.error);
        stop();
      }
    };

    utteranceRef.current = utterance;
    setCurrentSentenceIndex(index);
    window.speechSynthesis.speak(utterance);
  }, [lang, rate, stop]);

  const handlePlay = useCallback(() => {
    if (isPaused && utteranceRef.current) {
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
      speakSentence(currentSentenceIndex >= 0 ? currentSentenceIndex : 0);
    }
  }, [currentSentenceIndex, isPlaying, isPaused, speakSentence, stop]);

  const progress = sentencesRef.current.length > 0 && currentSentenceIndex >= 0
    ? Math.round(((currentSentenceIndex) / sentencesRef.current.length) * 100)
    : 0;

  if (!('speechSynthesis' in window)) {
    return (
      <div className="tts-player tts-player--unsupported">
        <span>TTS tidak didukung di browser ini</span>
      </div>
    );
  }

  return (
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
          {currentSentenceIndex >= 0
            ? `${Math.min(currentSentenceIndex + 1, sentencesRef.current.length)}/${sentencesRef.current.length}`
            : `${sentencesRef.current.length} kalimat`}
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
  );
}

TTSPlayer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TTSPlayer;
export { splitSentences };
