import { generateOgImage } from '@/lib/og';

export const alt = 'Shop Fronts & Commercial Entrances — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Shop Fronts & Commercial Entrances',
    description: 'Commercial glass facades and high-visibility shopfronts for retail and restaurants in Lahore.',
  });
}
