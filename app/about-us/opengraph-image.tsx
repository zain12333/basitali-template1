import { generateOgImage } from '@/lib/og';

export const alt = 'About Us — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'About Us',
    description: 'Lahore\'s trusted manufacturer and installer of architectural aluminum, glazing, and stainless steel solutions.',
  });
}
