import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../lib/gsap';

// Line-by-line mask reveal for headings, driven by IntersectionObserver
// so it can never get trapped hidden by reflow or smooth-scroll math.
const SplitHeading = ({ as: Tag = 'h2', className = '', children }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(el, { type: 'lines' });
      gsap.set(split.lines, { yPercent: 120, opacity: 0 });

      const io = new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          gsap.to(split.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.12,
            overwrite: 'auto',
          });
          obs.disconnect();
        },
        { threshold: 0.2 }
      );
      io.observe(el);

      return () => {
        io.disconnect();
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={{ overflow: 'hidden' }}>
      {children}
    </Tag>
  );
};

export default SplitHeading;
