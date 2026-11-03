import { CLIENT_INFO } from './data';

export function getSiteConfig() {
  return {
    businessName: CLIENT_INFO.businessName,
    shortName: CLIENT_INFO.shortName,
    tagline: 'Professional Architectural Aluminum & Glass Solutions in Lahore',
    logo: '/og-image.png',
    favicon: '/icon.png',
    siteTitle: 'Basit Ali Aluminum & Glass Work | Lahore Professional Services',
    metaDescription:
      'Premier aluminum windows, doors, glass partitions, shower cabins, shop fronts, tempered glass, and 24/7 emergency repair services across Lahore. Call 0320-2740066 for free measurement.',
    siteUrl: 'https://basitali-template1.vercel.app',
    phone: CLIENT_INFO.phone,
    phoneTel: CLIENT_INFO.phoneTel,
    email: CLIENT_INFO.email,
    address: {
      streetAddress: '196-A Main Multan Road',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
  };
}
