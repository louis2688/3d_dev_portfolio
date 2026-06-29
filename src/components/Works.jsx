import React from 'react';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import SplitHeading from './anim/SplitHeading';
import Reveal from './anim/Reveal';

const ProjectCard = ({ name, description, tags, image, source_code_link }) => {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${
      -y * 7
    }deg)`;
  };
  const reset = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  };

  return (
    <div
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="border-gradient glass group w-full overflow-hidden rounded-3xl p-4 transition-[transform,box-shadow] duration-200 ease-out hover:shadow-card sm:w-[360px]"
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        <button
          onClick={() => window.open(source_code_link, '_blank')}
          className="glass-strong absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
        >
          <img src={github} alt="source" className="h-1/2 w-1/2 object-contain" />
        </button>
      </div>

      <div className="mt-5 px-1">
        <h3 className="font-display text-[22px] font-bold text-white">{name}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-secondary">
          {description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 px-1 pb-1">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className={`font-mono text-[13px] ${tag.color}`}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <p className={styles.sectionSubText}>My work</p>
      <SplitHeading as="h2" className={`${styles.sectionHeadText} mt-3`}>
        Selected Projects.
      </SplitHeading>

      <Reveal
        as="p"
        className="mt-5 max-w-3xl text-[17px] leading-[30px] text-secondary"
      >
        A selection of projects that showcase my ability to solve complex
        problems, work across technologies, and ship polished products — each
        linked to its source.
      </Reveal>

      <Reveal className="mt-20 flex flex-wrap gap-7" stagger={0.15} y={60}>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </Reveal>
    </>
  );
};

export default SectionWrapper(Works, '');
