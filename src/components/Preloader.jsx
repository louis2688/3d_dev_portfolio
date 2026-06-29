import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

// Cinematic intro: a counter ticks 0→100 while a curtain holds the
// page, then slides away revealing the hero. Calls onDone when gone.
const Preloader = ({ onDone }) => {
  const root = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => onDone?.(),
    });

    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.v)),
    })
      .to(barRef.current, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
      .to('.preloader-word', {
        yPercent: -110,
        duration: 0.6,
        ease: 'power3.in',
        stagger: 0.05,
      })
      .to(
        root.current,
        { yPercent: -100, duration: 0.9, ease: 'expo.inOut' },
        '-=0.1'
      );

    return () => tl.kill();
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-primary"
    >
      <div className="overflow-hidden">
        <h2 className="preloader-word font-display text-secondary text-sm tracking-[0.4em] uppercase">
          Louis — Fullstack Developer
        </h2>
      </div>

      <div className="mt-8 flex items-end gap-3">
        <span
          ref={countRef}
          className="font-display text-gradient text-[18vw] leading-none font-bold tabular-nums sm:text-[120px]"
        >
          {count}
        </span>
        <span className="mb-3 font-mono text-secondary text-sm">%</span>
      </div>

      <div className="mt-6 h-px w-56 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan"
        />
      </div>
    </div>
  );
};

export default Preloader;
