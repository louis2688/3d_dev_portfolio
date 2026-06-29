import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    const el = document.querySelector(`#${id}`);
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-glow' : 'bg-transparent'
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActive('');
            window.__lenis
              ? window.__lenis.scrollTo(0)
              : window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2"
        >
          <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
          <p className="font-display text-[18px] font-bold text-white">
            Louis<span className="text-violet">.</span>
          </p>
        </a>

        <ul className="hidden list-none flex-row gap-9 sm:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => {
                  setActive(link.title);
                  goTo(link.id);
                }}
                className={`group relative font-mono text-[13px] uppercase tracking-widest transition-colors ${
                  active === link.title
                    ? 'text-white'
                    : 'text-secondary hover:text-white'
                }`}
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet to-cyan transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[26px] w-[26px] cursor-pointer object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              toggle ? 'flex' : 'hidden'
            } glass-strong absolute right-4 top-16 z-10 min-w-[160px] rounded-2xl p-5`}
          >
            <ul className="flex list-none flex-col items-start gap-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setToggle(false);
                      setActive(link.title);
                      goTo(link.id);
                    }}
                    className={`font-mono text-[14px] uppercase tracking-widest ${
                      active === link.title ? 'text-white' : 'text-secondary'
                    }`}
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
