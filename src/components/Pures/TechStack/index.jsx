import React from 'react';
import { techStack } from '../../../content';

import './style.scss';

const accentColors = [
  '#4A90FF', // blue
  '#00E676', // green
  '#FF6B35', // orange
  '#FFBE0B', // yellow
  '#E040FB', // purple
  '#00BCD4', // cyan
  '#FF4081', // pink
  '#7C4DFF', // deep purple
];

// Flatten all tech items with their category
const allTechItems = Object.entries(techStack).flatMap(([category, items]) => items.map((item) => ({
  ...item,
  category,
})));

function TechStack() {
  return (
    <div className="tech-stack">
      <h3 className="tech-stack__title">Tech Stack</h3>

      <div className="tech-stack__grid">
        {allTechItems.map(({ name, icon, category }, index) => {
          const color = accentColors[index % accentColors.length];
          return (
            <div
              key={name}
              className="tech-stack__card"
              style={{ '--accent': color }}
            >
              <div className="tech-stack__card-icon">
                <img src={icon} alt={name} />
              </div>
              <div className="tech-stack__card-info">
                <p className="tech-stack__card-name">{name}</p>
                <span className="tech-stack__card-category">{category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechStack;
