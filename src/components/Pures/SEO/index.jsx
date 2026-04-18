import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE_NAME = 'Dimas Maulana Dwi Saputra';
const DEFAULT_IMAGE = 'https://dmds.dev/assets/images/profile.jpg';
const DEFAULT_LOCALE = 'id_ID';

function SEO({
  title,
  description,
  url,
  type = 'website',
  image = DEFAULT_IMAGE,
  publishedTime,
  tags,
}) {
  const documentTitle = title
    ? `${title} | ${SITE_NAME}`
    : SITE_NAME;

  const metaTags = [
    { name: 'description', content: description },

    // Open Graph — use full documentTitle to match prerendered HTML
    { property: 'og:title', content: documentTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: DEFAULT_LOCALE },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: documentTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];

  if (type === 'article') {
    if (publishedTime) {
      metaTags.push({ property: 'article:published_time', content: publishedTime });
    }
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        metaTags.push({ property: 'article:tag', content: tag });
      });
    }
  }

  return (
    <Helmet>
      <title>{documentTitle}</title>
      {url && <link rel="canonical" href={url} />}
      {metaTags.map((tag, index) => (
        <meta key={`${tag.name || tag.property}-${index}`} {...tag} />
      ))}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article']),
  image: PropTypes.string,
  publishedTime: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
