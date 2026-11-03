import { generateOgImage } from '@/lib/og';

export const alt = 'Our Services — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Our Services',
    description: 'Explore all 10 professional aluminum & glass services — windows, doors, shower cabins, shop fronts, and more.',
  });
}
