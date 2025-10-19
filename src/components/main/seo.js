import { FAQPageJsonLd, NextSeo } from 'next-seo';
import Head from 'next/head';
import React from 'react';

/**
 * @param {SeoData} props
 */
export default function SeoComp(props) {
  return (
    <div>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon/favicon-96x96.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/favicon.svg' color='#5bbad5' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={props?.keywords || ''} />

        {props?.noIndex && <meta name='robots' content='all' />}

        <NextSeo
          title={props.title}
          description={props.description}
          canonical={props.canonical}
          openGraph={props.openGraph}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />

        <FAQPageJsonLd mainEntity={props.faqs} />
      </Head>
    </div>
  );
}
