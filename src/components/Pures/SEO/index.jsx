import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE_NAME = 'Dimas Maulana Dwi Saputra';
const SITE_URL = 'https://dmds.dev';
const DEFAULT_IMAGE = 'https://dmds.dev/assets/images/profile.jpg';
const DEFAULT_LOCALE = 'id_ID';

function buildJsonLd({ title, description, url, type, publishedTime, tags }) {
  if (type === 'article') {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      datePublished: publishedTime || undefined,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/images/profile.jpg`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    };

    if (tags && tags.length > 0) {
      schema.keywords = tags.join(', ');
    }

    return schema;
  }

  // Default: WebSite schema
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: url || SITE_URL,
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

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

  const jsonLd = buildJsonLd({ title, description, url, type, publishedTime, tags });

  return (
    <Helmet>
      <title>{documentTitle}</title>
      {url && <link rel="canonical" href={url} />}
      {metaTags.map((tag, index) => (
        <meta key={`${tag.name || tag.property}-${index}`} {...tag} />
      ))}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
