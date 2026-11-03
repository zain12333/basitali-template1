import { generateOgImage } from '@/lib/og';

export const alt = 'Curtain Wall & Spider Glass Systems — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Curtain Wall & Spider Glass Systems',
    description: 'Building facade spider glass and curtain wall systems with exceptional structural integrity.',
  });
}
