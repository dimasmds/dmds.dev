import React from 'react';
import { tags } from '../../../content';
import Tag from '../Tag';

import './style.scss';

function Tags() {
  return (
    <ul className="tags">
      {tags.map(({ icon, name }) => (
        <Tag key={name} name={name} icon={icon} />
      ))}
    </ul>
  );
}

export default Tags;
