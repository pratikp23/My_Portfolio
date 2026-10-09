import { Mail, ArrowRight, FileText, ArrowUpRight, Briefcase, Award, Trophy, Code2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Components/Icons';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, PROFILE } from '../config';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Achievements from './Achievements';
import Certifications from './Certifications';
import Contact from './Contact';

const Home = () => {
  const highlights = [
    {
      icon: <Briefcase size={16} className="text-amber-400 flex-shrink-0" />,
      label: "Former SDE Intern",
      value: "Bluestock Fintech",
    },
    {
      icon: <Trophy size={16} className="text-amber-400 flex-shrink-0" />,
      label: "1st Place Winner",
      value: "Techno Genesis Hackathon",
    },
    {
      icon: <Award size={16} className="text-amber-400 flex-shrink-0" />,
      label: "Top 10 Finalist",
      value: "Void Hacks 7.0",
    },
    {
      icon: <Code2 size={16} className="text-amber-400 flex-shrink-0" />,
      label: "Full Stack Focus",
      value: "React, Node, Mongo, Python",
    },
  ];

  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[88vh] flex flex-col justify-between items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 overflow-hidden">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[550px] h-[300px] bg-amber-500/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[70vw] max-w-[380px] h-[260px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

        {/* Center Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium mb-5 max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="hidden sm:inline">Available for Full-Time & Internship Software Engineering Roles</span>
            <span className="sm:hidden text-[11px]">Available for SWE / Full Stack Roles</span>
          </motion.div>

          {/* Primary Name Headline with Original Cartoonish Font */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-3 sm:mb-4 select-none"
          >
            <span className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-medium text-slate-400 self-center">
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
                className="inline-block text-2xl sm:text-3xl md:text-4xl select-none filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)] cursor-pointer"
                title="Hi there!"
              >
                👋
              </motion.span>
              <span>Hi, I'm</span>
            </span>
            <span className="cartoonish-logo-text px-3 py-1 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              PRATIK
            </span>
            <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 uppercase tracking-tight">
              PATHAK
            </span>
          </motion.div>

          {/* Role Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className="text-base sm:text-xl md:text-2xl font-semibold text-slate-300 mb-4 sm:mb-5 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]"
          >
            Full Stack Developer <span className="text-amber-400 font-mono">/</span> CSE Student
          </motion.p>

          {/* Recruiter Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl text-slate-400 text-xs sm:text-base leading-relaxed mb-7 sm:mb-8 font-normal px-2"
          >
            Computer Science undergraduate (2023–2027) with practical Software Development Engineer internship experience at <strong className="text-slate-200 font-semibold">Bluestock Fintech</strong>. I build clean, reliable web applications and AI-integrated systems that solve concrete problems.
          </motion.p>

          {/* Immediate Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full sm:w-auto"
          >
            {/* View Projects */}
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight size={15} />
            </a>

            {/* Resume Button */}
            <a
              href={SOCIAL_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] hover:border-amber-500/40 font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText size={15} className="text-amber-400" />
              <span>View Resume</span>
              <ArrowUpRight size={14} className="opacity-60" />
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white border border-transparent hover:border-white/[0.08] text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Mobile-Only Social Channels (Hidden on desktop where Left Dock is active) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex md:hidden items-center gap-3 mb-7"
          >
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </motion.div>

          {/* Quick Credential Strip for Recruiters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-6 border-t border-white/[0.08]"
          >
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left hover:border-amber-500/25 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {item.icon}
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider truncate">
                    {item.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug break-words">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* FULL-WIDTH CONTINUOUS HORIZONTAL MOVING TICKER (Direct child of section, naturally 100% width) */}
        <div className="w-full mt-10 pt-6 pb-2 border-t border-white/[0.07] bg-[#0b0d13]/60 backdrop-blur-md overflow-hidden flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-3.5 px-4 text-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono text-slate-300 uppercase tracking-[0.2em] font-bold">
                Technologies I Engineer Scalable Systems With
              </span>
            </div>
            <a
              href="#skills"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition-all hover:scale-105 shadow-[0_0_12px_rgba(245,158,11,0.2)] cursor-pointer"
            >
              <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Try Physics Lab 🕹️</span>
            </a>
          </div>

          <div className="w-full relative overflow-hidden mask-gradient-x py-2">
            <div className="animate-ticker flex gap-3.5 sm:gap-5 pr-3.5 sm:pr-5">
              {[...PROFILE.techStack, ...PROFILE.techStack].map((tech, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-3 px-4.5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-amber-500/40 text-slate-100 shadow-md transition-all flex-shrink-0 cursor-default group"
                >
                  <span className="text-xl sm:text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    {tech.icon}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs sm:text-sm md:text-base text-slate-100 group-hover:text-amber-400 transition-colors leading-tight">
                      {tech.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                      Production Stack
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT ME SECTION */}
      <section id="about">
        <About />
      </section>

      {/* EXPERIENCE SECTION — ELEVATED DIRECTLY AFTER ABOUT FOR RECRUITER VISIBILITY */}
      <section id="experience">
        <Experience />
      </section>

      {/* ENGINEERING PROJECTS SECTION */}
      <section id="projects">
        <Projects />
      </section>

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

      {/* GET IN TOUCH & DIRECT CONTACT */}
      <section id="contact">
        <Contact />
      </section>

    </div>
  );
};

export default Home;
