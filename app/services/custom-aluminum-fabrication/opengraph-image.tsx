import { generateOgImage } from '@/lib/og';

export const alt = 'Custom Aluminum Fabrication — Basit Ali Aluminum & Glass Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage({
    title: 'Custom Aluminum Fabrication',
    description: 'Customized aluminum louvers, pergolas, skylights, railings, and cladding built to exact blueprints.',
  });
}
