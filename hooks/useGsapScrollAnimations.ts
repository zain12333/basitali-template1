'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollFadeUp(selector: string, options?: { stagger?: number; delay?: number; duration?: number; y?: number }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: options?.y ?? 60,
        opacity: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        stagger: options?.stagger ?? 0.15,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, [selector, options?.stagger, options?.delay, options?.duration, options?.y]);
}

export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up elements
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // Fade left elements
      gsap.utils.toArray<HTMLElement>('.gsap-fade-left').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          x: -60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });

      // Fade right elements
      gsap.utils.toArray<HTMLElement>('.gsap-fade-right').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          x: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });

      // Scale up elements
      gsap.utils.toArray<HTMLElement>('.gsap-scale-up').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          scale: 0.85,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.4)',
        });
      });

      // Stagger children elements
      gsap.utils.toArray<HTMLElement>('.gsap-stagger-children').forEach((parent) => {
        const children = parent.children;
        gsap.from(children, {
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      });

      // Parallax background sections
      gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -80,
          ease: 'none',
        });
      });

      // Text reveal with clip-path
      gsap.utils.toArray<HTMLElement>('.gsap-text-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        });
      });

      // Counter / number animations
      gsap.utils.toArray<HTMLElement>('.gsap-counter').forEach((el) => {
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
        });
      });

      // Horizontal line grow
      gsap.utils.toArray<HTMLElement>('.gsap-line-grow').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
