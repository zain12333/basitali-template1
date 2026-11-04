import type { Metadata } from 'next';
import { getSiteConfig } from './site-config';

export function pageOG(page: {
  title: string;
  description: string;
  url?: string;
}): NonNullable<Metadata['openGraph']> {
  const config = getSiteConfig();
  return {
    type: 'website',
    siteName: config.businessName,
    locale: 'en_US',
    title: page.title,
    description: page.description,
    url: page.url,
    images: [
      {
        url: `${config.siteUrl}/logo.jpg`,
        width: 877,
        height: 877,
        alt: 'Basit Ali Aluminum & Glass Work Logo',
        type: 'image/jpeg',
      },
    ],
  };
}
