import { generateOgImage } from '@/lib/og';

export const alt = 'Sitemap — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Sitemap',
    description: 'Navigate all pages on the Basit Ali Aluminum & Glass Work website.',
  });
}
