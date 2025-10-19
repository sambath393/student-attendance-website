/**
 * @typedef {object} SeoFaq
 * @property {string} questionName
 * @property {string} acceptedAnswerText
 */

/**
 * @typedef {object} SeoImages
 * @property {string} url
 */

/**
 * @typedef {object} SeoGraph
 * @property {string} title
 * @property {string} description
 * @property {SeoImages} images
 * @property {string} siteName
 */

/**
 * @typedef {object} SeoData
 * @property {string} canonical
 * @property {string} title
 * @property {string} description
 * @property {string} keywords
 * @property {SeoGraph} openGraph
 * @property {boolean} noIndex
 * @property {SeoFaq} faqs
 */
