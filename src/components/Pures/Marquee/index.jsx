import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function Marquee({ children, reverse, speed, className }) {
  const duration = speed || 30;
  const animationStyle = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  };

  // Render enough copies to guarantee no gaps
  const content = (
    <>
      {children}
      {children}
      {children}
    </>
  );

  return (
    <div className={`marquee ${className || ''}`}>
      <div className="marquee__track" style={animationStyle}>
        {content}
      </div>
      <div className="marquee__track" aria-hidden="true" style={animationStyle}>
        {content}
      </div>
    </div>
  );
}

Marquee.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
  speed: PropTypes.number,
  className: PropTypes.string,
};

Marquee.defaultProps = {
  reverse: false,
  speed: 30,
  className: '',
};

export default Marquee;
