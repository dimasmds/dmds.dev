import React from 'react';
import Navigation from '../../Pures/Navigation';
import Footer from '../../Pures/Footer';
import { navigation } from '../../../content';

function HomePage() {
  const { title } = navigation;

  return (
    <>
      <Navigation title={title} />
      <main />
      <Footer />
    </>
  );
}

export default HomePage;
