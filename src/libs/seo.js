import { getDomain } from '@/utilities/dev';

/**
 * @param {SeoData} data
 * @returns {SeoData}
 */
export function seoDataConvert(data) {
  const openGraph = {
    url: `${getDomain}${data.canonical}`,
    title: data.openGraph.title || 'Welcome to my website',
    description: data.openGraph.description || 'This is my description.',
    images: data.openGraph.images || [
      {
        url: '/favicon/web-app-manifest-512x512.png',
      },
    ],
    siteName: data.siteName || 'My Website',
  };

  return {
    canonical: `${getDomain}${data.canonical}`,
    title: data.title || 'Welcome to my website',
    description: data.description || 'This is my description.',
    keywords: `${data.keywords}`,
    openGraph: openGraph,
    noIndex: data.noIndex ? true : false,
    faqs: data.faqs || [],
  };
}
