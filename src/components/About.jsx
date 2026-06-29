import React from 'react';
import { styles } from '../styles';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import SplitHeading from './anim/SplitHeading';
import Reveal from './anim/Reveal';

const ServiceCard = ({ title, icon }) => {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${
      -y * 10
    }deg) translateZ(6px)`;
  };
  const reset = (e) => {
    e.currentTarget.style.transform =
      'perspective(900px) rotateY(0) rotateX(0)';
  };

  return (
    <div
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="border-gradient glass group relative flex min-h-[260px] w-full flex-col items-start justify-between rounded-3xl p-6 transition-transform duration-200 ease-out xs:w-[250px]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet/10 ring-1 ring-violet/20">
        <img src={icon} alt={title} className="h-8 w-8 object-contain" />
      </div>
      <div>
        <h3 className="font-display text-[20px] font-semibold text-white">
          {title}
        </h3>
        <div className="mt-3 h-px w-10 bg-gradient-to-r from-violet to-transparent transition-all duration-300 group-hover:w-20" />
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <p className={styles.sectionSubText}>Introduction</p>
      <SplitHeading as="h2" className={`${styles.sectionHeadText} mt-3`}>
        Overview.
      </SplitHeading>

      <Reveal
        as="p"
        className="mt-5 max-w-3xl text-[17px] leading-[30px] text-secondary"
      >
        As a Fullstack Developer, I bridge the gap between stunning front-end
        interfaces and powerful back-end functionality. With expertise across a
        wide range of technologies, I bring the skills and innovation needed to
        build cutting-edge web and mobile applications.
      </Reveal>

      <Reveal
        className="mt-20 flex flex-wrap gap-6"
        stagger={0.12}
        y={50}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </Reveal>
    </>
  );
};

export default SectionWrapper(About, 'about');
