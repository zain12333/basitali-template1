import { generateOgImage } from '@/lib/og';

export const alt = 'Glass Doors & Partitions — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Glass Doors & Partitions',
    description: 'Frameless and slimline glass doors and wall partitions for modern residential and commercial spaces.',
  });
}
