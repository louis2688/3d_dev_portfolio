import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { styles } from '../styles';
import { NebulaCanvas } from './canvas';

const ROLES = ['Web', 'Mobile', 'Interactive 3D', 'Backend'];

const Hero = () => {
  const root = useRef(null);
  const [active, setActive] = useState(true);

  // Pause the WebGL render loop when the hero scrolls out of view.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0.01 }
    );
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      // Intro — runs after the preloader curtain (~2.4s)
      const heading = new SplitText('.hero-title', { type: 'chars,words' });
      gsap.set('.hero-anim', { opacity: 0 });

      const tl = gsap.timeline({ delay: 2.4 });
      tl.from(heading.chars, {
        yPercent: 120,
        opacity: 0,
        rotateX: -80,
        stagger: 0.025,
        duration: 1,
        ease: 'expo.out',
      })
        .to('.hero-anim', { opacity: 1, duration: 0.6, stagger: 0.12 }, '-=0.5')
        .from(
          '.hero-anim',
          { y: 26, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
          '<'
        );

      // Rotating role word
      let i = 0;
      gsap.delayedCall(3.4, function cycle() {
        const el = document.querySelector('.role-word');
        if (!el) return;
        i = (i + 1) % ROLES.length;
        gsap.to(el, {
          yPercent: -100,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            el.textContent = ROLES[i];
            gsap.fromTo(
              el,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
            );
          },
        });
        gsap.delayedCall(2.2, cycle);
      });

      // Scroll: content drifts up + fades
      gsap.to('.hero-content', {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  const goTo = (id) => {
    const el = document.querySelector(id);
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={root}
      className="relative w-full h-screen mx-auto overflow-hidden"
    >
      {/* 3D nebula */}
      <NebulaCanvas active={active} />

      {/* gradient veils for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(124,92,255,0.18),transparent_55%)]" />

      <div
        className={`hero-content ${styles.paddingX} absolute inset-0 top-[18%] sm:top-[20%] max-w-7xl mx-auto flex flex-col justify-start`}
      >
        <div className="hero-anim kicker mb-6">Available for work · 2026</div>

        <h1
          className={`hero-title ${styles.heroHeadText}`}
          style={{ perspective: 600 }}
        >
          Hi, I'm <span className="text-[#c9bcff]">Louis</span>
          <br />I build for the web.
        </h1>

        <div className="hero-anim mt-6 flex items-center gap-3 font-display text-2xl sm:text-3xl text-white">
          <span className="text-secondary text-lg sm:text-2xl">I craft</span>
          <span className="relative inline-flex h-[1.3em] overflow-hidden">
            <span className="role-word text-gradient-violet font-semibold">
              Web
            </span>
          </span>
          <span className="text-secondary text-lg sm:text-2xl">
            experiences.
          </span>
        </div>

        <p className={`hero-anim ${styles.heroSubText} mt-6 max-w-xl`}>
          Fullstack developer specializing in sleek interfaces, optimized
          performance, and 3D web experiences that mesmerize and engage.
        </p>

        <div className="hero-anim mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={() => goTo('#work')}
            data-cursor
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet to-cyan px-7 py-3 font-medium text-primary"
          >
            <span className="relative z-10">View my work</span>
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
          </button>
          <button
            onClick={() => goTo('#contact')}
            data-cursor
            className="rounded-full border border-violet/40 px-7 py-3 font-medium text-white transition-colors hover:border-violet hover:bg-violet/10"
          >
            Get in touch
          </button>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-anim absolute bottom-10 w-full flex justify-center">
        <div className="flex h-[60px] w-[32px] items-start justify-center rounded-full border-2 border-secondary/50 p-2">
          <div className="h-2.5 w-2.5 animate-float rounded-full bg-gradient-to-b from-violet to-cyan" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
