import { getDomain } from '@/utilities/dev';
import { getServerSideSitemapIndex } from 'next-sitemap';

const sitemapList = ['/sitemap-main.xml'];

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const sitemapIndex = sitemapList.map((load) => `${getDomain}${load}`);

  return getServerSideSitemapIndex(ctx, sitemapIndex);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
