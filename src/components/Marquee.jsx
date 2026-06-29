import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

const WORDS = [
  'Fullstack',
  'React',
  'Three.js',
  'Node',
  'Next.js',
  'TypeScript',
  'GSAP',
  'WebGL',
  'Mobile',
  'UI / UX',
];

// Infinite horizontal marquee whose speed reacts to scroll velocity.
const Marquee = () => {
  const track = useRef(null);

  useGSAP(
    () => {
      gsap.to(track.current, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none',
      });
    },
    { scope: track }
  );

  const items = [...WORDS, ...WORDS];

  return (
    <div className="mx-auto my-10 max-w-7xl px-6 sm:px-16">
      <div className="relative select-none overflow-hidden rounded-2xl border border-white/10 py-6">
        <div ref={track} className="marquee-track">
          {items.map((w, i) => (
            <span
              key={i}
              className="mx-6 font-display text-[34px] font-semibold tracking-tight text-white/80 sm:text-[48px]"
            >
              {w}
              <span className="mx-6 text-violet">✦</span>
            </span>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary to-transparent" />
      </div>
    </div>
  );
};

export default Marquee;
