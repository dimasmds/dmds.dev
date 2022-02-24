import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import ReactMarkdown from 'react-markdown';
import Footer from '../../Pures/Footer';

import './style.scss';

function AboutPage() {
  const [aboutText, setAboutText] = React.useState('');

  useEffect(async () => {
    const response = await fetch('/contents/about/about.md');
    const responseText = await response.text();
    setAboutText(responseText);
    hljs.highlightAll();
  });

  return (
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
  );
}

export default AboutPage;
