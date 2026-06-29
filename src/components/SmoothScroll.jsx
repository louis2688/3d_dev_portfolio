import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

// Drives Lenis momentum scrolling off the GSAP ticker and keeps
// ScrollTrigger in sync. Mount once near the root.
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // expose for anchor-link scrolling (Navbar / Hero CTA)
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Reveals use IntersectionObserver, so the only ScrollTrigger
    // consumers left are the hero scrub + marquee. One refresh on load
    // (after layout settles) is enough.
    lenis.scrollTo(0, { immediate: true });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
};

export default SmoothScroll;
