import { generateOgImage } from '@/lib/og';

export const alt = 'Office Glass Work & Cabins — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Office Glass Work & Cabins',
    description: 'Professional acoustic glass partitions and executive cabin solutions for corporate environments.',
  });
}
