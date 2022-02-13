import React from 'react';
import Navigation from '../../Pures/Navigation';
import { navigation } from '../../../content';

function AboutPage() {
  const { title } = navigation;
  return (
    <Navigation title={title} />
  );
}

export default AboutPage;
