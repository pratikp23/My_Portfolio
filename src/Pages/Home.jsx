import { useRef, useEffect, useState } from 'react';
import { Mail, ArrowRight, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Components/Icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SOCIAL_LINKS } from '../config';
import Magnetic from '../Components/Magnetic';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Achievements from './Achievements';
import Certifications from './Certifications';
import Contact from './Contact';
import TechSwapCloud from '../Components/TechSwapCloud';
import Lanyard from '../Components/Lanyard/Lanyard';
import TechText from '../Components/TechText/TechText';
import CursorGrid from '../Components/CursorGrid/CursorGrid';
import TextLoop from '../Components/TextLoop/TextLoop';

const Home = () => {
  const heroRef = useRef(null);
  const [isLight, setIsLight] = useState(() => document.documentElement.classList.contains('light'));
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const themeObserver = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => themeObserver.disconnect();
  }, []);

  // Track exact scroll position and active section so refreshing stays on the exact section/item
  useEffect(() => {
    let canTrack = false;
    const enableTracking = () => {
      canTrack = true;
    };

    window.addEventListener('portfolio:restored', enableTracking, { once: true });
    window.addEventListener('wheel', enableTracking, { passive: true, once: true });
    window.addEventListener('touchstart', enableTracking, { passive: true, once: true });
    const fallbackTimer = setTimeout(enableTracking, 420);

    const sectionIds = ['about', 'projects', 'skills', 'achievements', 'certifications', 'contact'];

    const saveCurrentPosition = () => {
      if (!canTrack || window.location.pathname !== '/') return;
      const scrollY = Math.round(window.scrollY);
      try {
        sessionStorage.setItem('portfolio_home_scroll_y', String(scrollY));
      } catch {
        // ignore storage errors
      }

      if (scrollY < 180) {
        try {
          sessionStorage.setItem('portfolio_active_section', 'home');
        } catch {
          // ignore
        }
        if (window.location.hash && window.history.replaceState) {
          window.history.replaceState(window.history.state, '', '/');
        }
        return;
      }

      const threshold = window.innerHeight * 0.42;
      let detected = 'about';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > 60) {
          detected = sectionIds[i];
          break;
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        detected = 'contact';
      }

      try {
        sessionStorage.setItem('portfolio_active_section', detected);
      } catch {
        // ignore
      }
      if (window.history.replaceState && window.location.hash !== `#${detected}`) {
        window.history.replaceState(window.history.state, '', `/#${detected}`);
      }
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(saveCurrentPosition);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', saveCurrentPosition);
    window.addEventListener('beforeunload', saveCurrentPosition);

    return () => {
      clearTimeout(fallbackTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('portfolio:restored', enableTracking);
      window.removeEventListener('wheel', enableTracking);
      window.removeEventListener('touchstart', enableTracking);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', saveCurrentPosition);
      window.removeEventListener('beforeunload', saveCurrentPosition);
    };
  }, []);

  const handleAnchorClick = (id, offset = -20) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset, duration: 1.6 });
      } else {
        const topOffset = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
      window.history.pushState(null, '', `/#${id}`);
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-x-clip">
      
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="hero-section relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 overflow-hidden"
      >
        
        {/* Interactive Dynamic Cursor Grid Background */}
        <CursorGrid
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          cellSize={54}
          color={isLight ? '#d97706' : '#ffffff'}
          gridColor={isLight ? '#94a3b8' : '#334155'}
          gridOpacity={isLight ? 0.22 : 0.15}
          fillOpacity={isLight ? 0.14 : 0.22}
          lineWidth={1.2}
          radius={220}
          spotlight={1.0}
          clickPulse={!isReduced}
          ambient={0.03}
        />

        {/* Subtle Ambient Background Gradients with Scroll Parallax */}
        <motion.div
          style={{ y: isReduced ? 0 : bgY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[550px] h-[300px] ${isLight ? 'bg-amber-500/[0.12]' : 'bg-white/[0.04]'} rounded-full blur-[120px]`} />
          <div className={`absolute top-1/2 right-1/4 w-[70vw] max-w-[380px] h-[260px] ${isLight ? 'bg-amber-600/[0.08]' : 'bg-slate-400/[0.03]'} rounded-full blur-[130px]`} />
        </motion.div>

        {/* 3D Physics Lanyard — Free on the Right Side of the Hero Section */}
        <Lanyard
          frontImage="/card-front.png"
          backImage="/card-back.png"
          strapImage="/band.png"
          imageFit="cover"
          cardColor="#111115"
          orientation="portrait"
          finish="glossy"
          cornerRadius={0.3}
          size={0.36}
          anchor={0.84}
          strapLength={0.05}
          strapColor="#111111"
          strapWidth={0.65}
          metal="silver"
          gravity={1}
          damping={0.5}
          elasticity={0.5}
          breeze={0.35}
          interactive={true}
          intro={true}
          className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        />

        {/* Main Hero Content Container — Aligned to the Left Side */}
        <motion.div
          style={{ opacity: isReduced ? 1 : contentOpacity }}
          className="relative z-10 flex flex-col items-start w-full max-w-4xl px-4 mb-4 ml-0 mr-auto text-left pointer-events-none lg:max-w-5xl xl:max-w-6xl sm:px-8 md:pl-24 md:pr-12 lg:pl-28 lg:pr-16"
        >
          {/* Greeting Salutation */}
          <motion.div
            initial={{ opacity: 1, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-greeting inline-flex items-center self-start justify-start gap-2 mb-1 text-lg font-medium pointer-events-auto select-none sm:text-xl md:text-2xl text-slate-400"
          >
            <motion.span
              animate={{
                rotate: [0, 20, -10, 20, -6, 14, 0]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.25,
                rotate: [0, 25, -15, 25, -10, 15, 0],
                transition: { duration: 0.6, repeat: Infinity }
              }}
              style={{ transformOrigin: "70% 70%" }}
              className="inline-block text-xl sm:text-2xl md:text-3xl select-none filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] cursor-pointer"
              title="Hi there!"
            >
              👋
            </motion.span>
            <span>Hi, I'm</span>
          </motion.div>

          {/* Primary Name with Interactive TechText Animation */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full h-[95px] sm:h-[135px] md:h-[165px] lg:h-[195px] mb-2 sm:mb-3 pointer-events-auto relative self-start"
          >
            <TechText
              text="PRATIK PATHAK"
              fontWeight={800}
              fontSize={155}
              fontFamily="'Space Grotesk', 'Plus Jakarta Sans', sans-serif"
              letterSpacing={-0.02}
              color={isLight ? "#0f172a" : "#F8FAFC"}
              accentColor={isLight ? "#d97706" : "#E2E8F0"}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={16}
              intro="none"
              introDuration={2}
              clickKick={true}
              guides={false}
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.4}
              selection={true}
              labels={true}
              align="left"
              draggable={true}
              sweep={true}
              className="w-full h-full"
            />
          </motion.div>

          {/* Role Subheading */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className="hero-role text-base sm:text-xl md:text-2xl font-semibold text-slate-300 mb-4 sm:mb-5 tracking-tight font-['Plus_Jakarta_Sans',sans-serif] pointer-events-auto select-text text-left self-start"
          >
            Full Stack Developer <span className="font-mono text-amber-400">/</span> CSE Student
          </motion.p>

          {/* Recruiter Pitch */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-pitch self-start max-w-2xl px-2 text-xs font-normal leading-relaxed text-left pointer-events-auto select-text sm:px-0 text-slate-400 sm:text-base mb-7 sm:mb-8"
          >
            Computer Science undergraduate (2023–2027) with practical Software Development Engineer internship experience at <strong className="font-semibold text-slate-200">Bluestock Fintech</strong>. I build clean, reliable web applications and AI-integrated systems that solve concrete problems.
          </motion.p>

          {/* Immediate Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center self-start justify-start w-full gap-3 mb-8 pointer-events-auto sm:flex-row sm:items-start"
          >
            {/* View Projects */}
            <Magnetic>
              <a
                href="#projects"
                onClick={handleAnchorClick('projects', -20)}
                data-cursor="GO"
                className="hero-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight size={15} />
              </a>
            </Magnetic>

            {/* Resume Button */}
            <Magnetic>
              <a
                href={SOCIAL_LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CV"
                className="hero-btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] hover:border-amber-500/40 font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText size={15} className="text-amber-400" />
                <span>View Resume</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
            </Magnetic>

            {/* Contact */}
            <Magnetic>
              <a
                href="#contact"
                onClick={handleAnchorClick('contact', -20)}
                data-cursor="HI"
                className="hero-btn-ghost w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white border border-transparent hover:border-white/[0.08] text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <span>Get in Touch</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Mobile-Only Social Channels */}
          <motion.div
            initial={{ opacity: 1, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center self-start justify-start gap-3 pointer-events-auto md:hidden mb-7"
          >
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GH"
              className="hero-mobile-social p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="IN"
              className="hero-mobile-social p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              data-cursor="COPY"
              className="hero-mobile-social p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* TECH STACK CAROUSEL CLOUD (Separate section below Hero) */}
      <section id="tech-cloud" className="relative w-full overflow-hidden">
        <TechSwapCloud />
      </section>

      {/* KINETIC TRANSITION 1 (Tech Cloud -> About) */}
      <div className="relative w-full py-2 sm:py-4 overflow-hidden pointer-events-auto select-none">
        <TextLoop
          text="PROBLEM SOLVER ✦ SOFTWARE ARCHITECTURE ✦ PRODUCTION SYSTEMS ✦ FULL-STACK"
          shape="wave"
          speed={55}
          direction="reverse"
          separator="✦"
          curviness={38}
          tilt={0.4}
          fontSize={24}
          fontWeight={900}
          letterSpacing={2.5}
          uppercase
          ribbon={false}
          outline={true}
          outlineWidth={1.5}
          color={isLight ? '#334155' : '#e2e8f0'}
          edgeFade={0.25}
          viewHeight={150}
          pauseOnHover
          draggable
          className="w-full"
        />
      </div>

      {/* ABOUT ME & WORK EXPERIENCE */}
      <section id="about">
        <About />
      </section>

      {/* ENGINEERING PROJECTS SECTION */}
      <section id="projects">
        <Projects />
      </section>

      {/* KINETIC TRANSITION 2 (Projects -> Skills) */}
      <div className="relative w-full py-2 sm:py-4 overflow-hidden pointer-events-auto select-none">
        <TextLoop
          text="IDEATE ✦ ARCHITECT ✦ CODE ✦ BENCHMARK ✦ DEPLOY ✦ SCALE"
          shape="wave"
          speed={60}
          direction="forward"
          separator="✦"
          curviness={44}
          tilt={-0.5}
          fontSize={25}
          fontWeight={900}
          letterSpacing={2.5}
          uppercase
          ribbon={false}
          outline={true}
          outlineWidth={1.5}
          color={isLight ? '#334155' : '#e2e8f0'}
          edgeFade={0.25}
          viewHeight={150}
          pauseOnHover
          draggable
          className="w-full"
        />
      </div>

      {/* TECHNICAL SKILLS SECTION */}
      <section id="skills">
        <Skills />
      </section>

      {/* HACKATHON & MILESTONE ACHIEVEMENTS */}
      <section id="achievements">
        <Achievements />
      </section>

      {/* VERIFIABLE CERTIFICATIONS */}
      <section id="certifications">
        <Certifications />
      </section>

      {/* KINETIC TRANSITION 3 (Certifications -> Contact) */}
      <div className="relative w-full py-2 sm:py-4 overflow-hidden pointer-events-auto select-none">
        <TextLoop
          text="READY FOR IMPACT ✦ LET'S BUILD SOMETHING EXTRAORDINARY ✦ OPEN FOR ROLES"
          shape="wave"
          speed={55}
          direction="forward"
          separator="✦"
          curviness={40}
          tilt={0.4}
          fontSize={24}
          fontWeight={900}
          letterSpacing={2.5}
          uppercase
          ribbon={false}
          outline={true}
          outlineWidth={1.5}
          color={isLight ? '#334155' : '#e2e8f0'}
          edgeFade={0.25}
          viewHeight={150}
          pauseOnHover
          draggable
          className="w-full"
        />
      </div>

      {/* GET IN TOUCH & DIRECT CONTACT */}
      <section id="contact">
        <Contact />
      </section>

    </div>
  );
};

export default Home;
