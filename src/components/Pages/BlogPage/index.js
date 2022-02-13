import React from 'react';
import Navigation from '../../Pures/Navigation';
import { navigation } from '../../../content';

function BlogPage() {
  const { title } = navigation;
  return (
    <Navigation title={title} activeMenu="Blog" />
  );
}

export default BlogPage;
