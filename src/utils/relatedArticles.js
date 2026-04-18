/**
 * Get related articles based on shared tags and recency.
 *
 * @param {Object} currentNotebook - The current notebook article
 * @param {string} currentNotebook.slug - Slug of the current article
 * @param {string[]} currentNotebook.tags - Tags of the current article
 * @param {string} currentNotebook.date - Date string (YYYY-MM-DD)
 * @param {Array} allNotebooks - Array of all notebook articles
 * @param {number} maxResults - Maximum number of related articles to return
 * @returns {Array} Array of related articles with slug, title, tags, date, score
 */
export function getRelatedArticles(currentNotebook, allNotebooks, maxResults = 3) {
  const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - SIX_MONTHS_MS);

  const scored = allNotebooks
    .filter((nb) => nb.slug !== currentNotebook.slug)
    .map((nb) => {
      let score = 0;

      // +3 points for each shared tag
      const currentTags = currentNotebook.tags || [];
      const nbTags = nb.tags || [];
      const sharedTags = currentTags.filter((tag) => nbTags.includes(tag));
      score += sharedTags.length * 3;

      // +1 point if the article is recent (within last 6 months)
      const nbDate = new Date(nb.date);
      if (nbDate >= sixMonthsAgo) {
        score += 1;
      }

      return {
        slug: nb.slug,
        title: nb.title,
        tags: nb.tags,
        date: nb.date,
        score,
      };
    })
    .filter((nb) => nb.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date) - new Date(a.date);
    });

  return scored.slice(0, maxResults);
}
