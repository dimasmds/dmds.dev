import React from 'react';
import Navigation from '../../Pures/Navigation';
import { navigation } from '../../../content';

function HomePage() {
  const { title } = navigation;

  return (
    <>
      <Navigation title={title} />
      <main />
    </>
  );
}

export default HomePage;
