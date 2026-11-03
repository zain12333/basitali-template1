import { generateOgImage } from '@/lib/og';

export const alt = 'Vertical Blinds & Roller Shades — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Vertical Blinds & Roller Shades',
    description: 'Functional vertical blinds, zebra blinds, and sunscreen roller shades for privacy and solar control.',
  });
}
