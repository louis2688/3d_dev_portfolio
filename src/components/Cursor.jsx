import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

// Minimal cursor: a single dot that tracks the pointer tightly and
// grows slightly over interactive elements. No trailing ring.
const Cursor = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power2' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power2' });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const enter = () => gsap.to(dot, { scale: 2.4, duration: 0.2 });
    const leave = () => gsap.to(dot, { scale: 1, duration: 0.2 });

    window.addEventListener('pointermove', move);

    const bind = () =>
      document.querySelectorAll('a, button, [data-cursor]').forEach((t) => {
        t.removeEventListener('pointerenter', enter);
        t.removeEventListener('pointerleave', leave);
        t.addEventListener('pointerenter', enter);
        t.addEventListener('pointerleave', leave);
      });
    bind();

    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('pointermove', move);
      observer.disconnect();
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
};

export default Cursor;
