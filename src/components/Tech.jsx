import React from 'react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import SplitHeading from './anim/SplitHeading';
import Reveal from './anim/Reveal';

const Tech = () => {
  return (
    <>
      <p className={styles.sectionSubText}>What I work with</p>
      <SplitHeading as="h2" className={`${styles.sectionHeadText} mt-3`}>
        Tech Stack.
      </SplitHeading>

      <Reveal
        className="mt-16 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7"
        stagger={0.05}
        y={30}
      >
        {technologies.map((tech) => (
          <div
            key={tech.name}
            data-cursor
            title={tech.name}
            className="border-gradient glass group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-center font-mono text-[10px] uppercase tracking-wider text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {tech.name}
            </span>
          </div>
        ))}
      </Reveal>
    </>
  );
};

export default SectionWrapper(Tech, '');
