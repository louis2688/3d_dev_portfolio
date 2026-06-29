import React from 'react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { testimonials } from '../constants';
import SplitHeading from './anim/SplitHeading';
import Reveal from './anim/Reveal';

const FeedbackCard = ({ testimonial, name, designation, company, image }) => (
  <div
    data-cursor
    className="border-gradient glass relative w-full rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 xs:w-[320px]"
  >
    <p className="font-display text-[60px] leading-none text-violet/40">"</p>
    <p className="-mt-4 text-[17px] leading-relaxed tracking-wide text-white-100/90">
      {testimonial}
    </p>
    <div className="mt-7 flex items-center justify-between gap-2">
      <div className="flex flex-col">
        <p className="font-display text-[16px] font-semibold text-white">
          <span className="text-gradient-violet">@</span> {name}
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-secondary">
          {designation} · {company}
        </p>
      </div>
      <img
        src={image}
        alt={`feedback-by-${name}`}
        className="h-11 w-11 rounded-full object-cover ring-2 ring-violet/30"
      />
    </div>
  </div>
);

const Feedbacks = () => {
  return (
    <div className="border-gradient glass mt-12 overflow-hidden rounded-[28px]">
      <div className={`${styles.padding} bg-[radial-fade]`}>
        <p className={styles.sectionSubText}>What others say</p>
        <SplitHeading as="h2" className={`${styles.sectionHeadText} mt-3`}>
          Testimonials.
        </SplitHeading>

        <Reveal className="mt-16 flex flex-wrap gap-7" stagger={0.15} y={50}>
          {testimonials.map((testimonial) => (
            <FeedbackCard key={testimonial.name} {...testimonial} />
          ))}
        </Reveal>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, '');
