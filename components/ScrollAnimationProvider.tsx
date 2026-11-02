'use client';

import { useScrollReveal } from '@/hooks/useGsapScrollAnimations';

export default function ScrollAnimationProvider() {
  useScrollReveal();
  return null;
}
