import { generateOgImage } from '@/lib/og';

export const alt = 'Tempered Glass Installation — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Tempered Glass Installation',
    description: 'Certified heat-treated safety glass 5x stronger than standard, meeting Lahore construction standards.',
  });
}
