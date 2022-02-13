import React from 'react';
import Navigation from '../../Pures/Navigation';
import { navigation } from '../../../content';

function NotebookPage() {
  const { title } = navigation;
  return (
    <Navigation title={title} activeMenu="Notebook" />
  );
}

export default NotebookPage;
