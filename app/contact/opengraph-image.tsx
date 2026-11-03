import { generateOgImage } from '@/lib/og';

export const alt = 'Contact Us — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Contact Us',
    description: 'Get in touch for free measurement, quotation, and consultation at 196-A Main Multan Rd, Lahore.',
  });
}
