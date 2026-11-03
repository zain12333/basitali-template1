import { generateOgImage } from '@/lib/og';

export const alt = 'Our Projects — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Our Projects',
    description: 'Portfolio of aluminum fabrication, glass installations, and custom metal work completed across Lahore.',
  });
}
