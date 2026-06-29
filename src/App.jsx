import { useState } from 'react';
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Cursor,
  Preloader,
  SmoothScroll,
  Marquee,
  Footer,
} from './components';

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Cursor />
      {!ready && <Preloader onDone={() => setReady(true)} />}

      <div className="relative z-0 bg-primary">
        {/* Ambient fixed background — pure CSS (no extra WebGL context) */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-[0.30]" />
          <div className="starfield absolute inset-0 opacity-70" />
        </div>

        {/* Foreground content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Marquee />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <Contact />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
};

export default App;
