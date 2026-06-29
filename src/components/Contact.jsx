import React, { useState, useRef, Suspense, lazy } from 'react';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import SplitHeading from './anim/SplitHeading';

// Below the fold — load the 3D globe (and its three.js deps) lazily.
const EarthCanvas = lazy(() => import('./canvas/Earth'));

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateId = 'template_anvnquh';
    const serviceId = 'service_oa8ir36';
    const publicKey = 'AZqmqUSD8cD7zQE4N';

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: 'Louis',
          from_email: form.email,
          to_email: 'louismadrigal26@gmail.com',
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert('Something went wrong.');
        }
      );
  };

  const inputCls =
    'glass rounded-xl border border-white/10 bg-tertiary/40 px-6 py-4 font-medium text-white placeholder:text-secondary/60 outline-none transition-colors focus:border-violet/60';

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <div className="border-gradient glass flex-[0.75] rounded-3xl p-8">
        <p className={styles.sectionSubText}>Get in touch</p>
        <SplitHeading as="h3" className={`${styles.sectionHeadText} mt-3`}>
          Contact.
        </SplitHeading>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          <label className="flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-widest text-secondary">
              Your Name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className={inputCls}
            />
          </label>
          <label className="flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-widest text-secondary">
              Your Email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className={inputCls}
            />
          </label>
          <label className="flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-widest text-secondary">
              Your Message
            </span>
            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className={inputCls}
            />
          </label>
          <button
            type="submit"
            data-cursor
            className="group relative w-fit overflow-hidden rounded-full bg-gradient-to-r from-violet to-cyan px-10 py-3 font-medium text-primary shadow-glow transition-transform hover:scale-[1.02]"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1">
        <Suspense fallback={null}>
          <EarthCanvas />
        </Suspense>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
