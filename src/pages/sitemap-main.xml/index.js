import { navbarBtns } from '@/constants/navbarBtns';
import { getDomain } from '@/utilities/dev';
import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  const fields = [];

  navbarBtns.map((load) => {
    fields.push(sitemapField(`${getDomain}${load.linkTo}`));

    load.children.map((load1) => {
      fields.push(sitemapField(`${getDomain}${load.linkTo}${load1.linkTo}`));
    });
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
