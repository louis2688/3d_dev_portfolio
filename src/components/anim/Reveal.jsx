import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Scroll-reveal wrapper driven by IntersectionObserver (not ScrollTrigger).
// IO fires on real visibility, so it is immune to layout shifts from
// late-loading images/fonts and to smooth-scroll position math — content
// can never get trapped hidden.
const Reveal = ({
  children,
  className = '',
  y = 40,
  delay = 0,
  stagger = 0,
  as: Tag = 'div',
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const targets = stagger ? el.children : el;

      gsap.set(targets, { y, opacity: 0 });

      const io = new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay,
            stagger,
            overwrite: 'auto',
          });
          obs.disconnect();
        },
        { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
      );
      io.observe(el);

      return () => io.disconnect();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;
