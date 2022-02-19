import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Navigation from '../../Pures/Navigation';
import { navigation } from '../../../content';
import Footer from '../../Pures/Footer';

import './style.scss';

function AboutPage() {
  const { title } = navigation;
  const [aboutText, setAboutText] = React.useState('');

  useEffect(async () => {
    const response = await fetch('/contents/about/about.md');
    const responseText = await response.text();
    setAboutText(responseText);
  });

  return (
    <>
      <Navigation title={title} activeMenu="About" />
      <div className="page-container">
        <main className="about">
          <h2 className="about__title">About me</h2>
          <div className="markdown-body">
            <ReactMarkdown>
              {aboutText}
            </ReactMarkdown>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
