import React from 'react';
import { techStack } from '../../../content';

import './style.scss';

function TechStack() {
  return (
    <div className="tech-stack">
      <h3 className="tech-stack__title">Tech Stack</h3>
      <div className="tech-stack__stack__list">
        {
        Object.keys(techStack)
          .map((key) => (
            <div key={key} className="tech-stack__stack">
              <h4>{key}</h4>
              {techStack[key].map(({ name, icon }) => (
                <div key={name} className="tech-stack__stack__item">
                  <img src={icon} alt={name} />
                  <p>
                    {name}
                  </p>
                </div>
              ))}
            </div>
          ))
      }
      </div>
    </div>
  );
}

export default TechStack;
