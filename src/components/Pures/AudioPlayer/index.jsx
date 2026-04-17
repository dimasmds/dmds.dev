import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function AudioPlayer({ audioSrc }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const seek = useCallback((e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
  }, [duration]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <div className="audio-player__inner">
        <audio ref={audioRef} preload="metadata">
          <source src={audioSrc} type="audio/mpeg" />
        </audio>

        <button
          type="button"
          className="audio-player__play-btn"
          onClick={togglePlay}
          title={isPlaying ? 'Jeda' : 'Putar'}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div
          ref={progressRef}
          className="audio-player__progress"
          onClick={seek}
          role="progressbar"
          tabIndex={0}
        >
          <div
            className="audio-player__progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="audio-player__progress-thumb"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="audio-player__time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  audioSrc: PropTypes.string.isRequired,
};

export default AudioPlayer;
