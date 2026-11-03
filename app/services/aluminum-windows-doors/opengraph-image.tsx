import { generateOgImage } from '@/lib/og';

export const alt = 'Aluminum Windows & Doors — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Aluminum Windows & Doors',
    description: 'Premium sliding, casement, and fixed windows plus doors — custom fabricated and installed across Lahore.',
  });
}
