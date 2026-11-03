import { generateOgImage } from '@/lib/og';

export const alt = 'Mirrors & 24/7 Glass Repair — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Mirrors & 24/7 Glass Repair',
    description: 'Emergency glass replacement, roller repairs, and custom LED beveled mirrors for homes and businesses.',
  });
}
