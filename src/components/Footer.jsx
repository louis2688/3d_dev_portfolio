import React from 'react';
import { styles } from '../styles';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/louis2688' },
  { label: 'Email', href: 'mailto:louismadrigal26@gmail.com' },
  { label: 'Back to top', href: '#' },
];

const Footer = () => {
  const onClick = (e, href) => {
    if (href === '#') {
      e.preventDefault();
      window.__lenis
        ? window.__lenis.scrollTo(0)
        : window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`${styles.paddingX} relative z-10 border-t border-white/10 py-12`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-display text-[18px] font-bold text-white">
          Louis<span className="text-violet">.</span>
        </p>
        <nav className="flex flex-wrap items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              onClick={(e) => onClick(e, l.href)}
              className="font-mono text-[12px] uppercase tracking-widest text-secondary transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-[11px] tracking-wider text-secondary/70">
          © {new Date().getFullYear()} — Built with React, R3F & GSAP
        </p>
      </div>
    </footer>
  );
};

export default Footer;
