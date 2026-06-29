import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import SplitHeading from './anim/SplitHeading';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: 'rgba(14,16,36,0.7)',
      backdropFilter: 'blur(14px)',
      color: '#fff',
      border: '1px solid rgba(124,92,255,0.18)',
      boxShadow: '0 20px 60px -20px rgba(124,92,255,0.35)',
      borderRadius: '20px',
    }}
    contentArrowStyle={{ borderRight: '7px solid rgba(124,92,255,0.4)' }}
    date={experience.date}
    dateClassName="!text-secondary !font-mono !text-[12px] !tracking-wider"
    iconStyle={{
      background: 'linear-gradient(135deg,#0e1024,#1a1342)',
      boxShadow: '0 0 0 4px rgba(124,92,255,0.25), 0 0 30px rgba(124,92,255,0.4)',
    }}
    icon={
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="h-[60%] w-[60%] object-contain"
        />
      </div>
    }
  >
    <h3 className="font-display text-[22px] font-bold text-white">
      {experience.title}
    </h3>
    <p
      className="font-mono text-[14px] font-medium text-violet"
      style={{ margin: 0 }}
    >
      {experience.company_name}
    </p>

    <ul className="ml-5 mt-5 list-disc space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="pl-1 text-[14px] leading-relaxed tracking-wide text-white-100/80"
        >
          {point}
        </li>
      ))}
    </ul>

    <div className="mt-5 border-t border-white/10 pt-3">
      <p className="font-mono text-[12px] uppercase tracking-widest text-secondary">
        {experience.tech_stack_title}
      </p>
      <p className="mt-1 text-[12px] font-light text-white-100/70">
        {experience.tech_stack_items}
      </p>
    </div>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <>
      <p className={styles.sectionSubText}>What I have done so far</p>
      <SplitHeading as="h2" className={`${styles.sectionHeadText} mt-3`}>
        Work Experience.
      </SplitHeading>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(124,92,255,0.25)">
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
