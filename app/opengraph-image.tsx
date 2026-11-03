import { generateOgImage } from '@/lib/og';

export const alt = 'Basit Ali Aluminum & Glass Work — Lahore Professional Services';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Basit Ali Aluminum & Glass Work',
    description: 'Premier aluminum windows, doors, glass partitions, shower cabins & 24/7 emergency repair in Lahore.',
  });
}
