import { SOCIAL_LINKS, PROFILE } from '../config';
import { Mail, ArrowRight, Download, MousePointerClick, Globe, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import FutureProjects from './FutureProjects';
import Experience from './Experience';
import Achievements from './Achievements';
import Contact from './Contact';

// CUSTOM HIGH-QUALITY DEVELOPER SVG ICONS
const ReactIcon = ({ size = 16, className }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const JsIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.843-.728-1.502-1.745-1.905-.626-.26-1.12-.416-1.716-.626-.507-.183-.755-.377-.755-.729 0-.365.313-.61.886-.61.547 0 .926.222(1.25).612l1.628-1.041c-.586-.926-1.42-1.394-2.825-1.394-1.928 0-3.218 1.12-3.218 2.76 0 1.704 1.094 2.37 2.657 2.92.703.247 1.34.48 1.758.74.455.285.663.585.663.974 0 .495-.417.82-1.133.82-.924 0-1.407-.468-1.81-1.107l-1.693 1.053c.69 1.182 1.732 1.833 3.49 1.833 2.188 0 3.518-1.105 3.518-2.928zm-11.666-.35c-.17-.585-.625-.975-1.314-.975-.715 0-1.157.442-1.157 1.365 0 1.027.403 1.43 1.144 1.43.61 0 1.04-.286 1.274-.832l1.742 1.014c-.663 1.196-1.833 1.638-3.094 1.638-2.82 0-4.043-1.69-4.043-3.835 0-2.457 1.456-3.86 4.108-3.86 1.547 0 2.665.65 3.146 1.86l-1.807 1.19z" fill="#f7df1e"/>
  </svg>
);

const TsIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.843-.728-1.502-1.745-1.905-.626-.26-1.12-.416-1.716-.626-.507-.183-.755-.377-.755-.729 0-.365.313-.61.886-.61.547 0 .926.222(1.25).612l1.628-1.041c-.586-.926-1.42-1.394-2.825-1.394-1.928 0-3.218 1.12-3.218 2.76 0 1.704 1.094 2.37 2.657 2.92.703.247 1.34.48 1.758.74.455.285.663.585.663.974 0 .495-.417.82-1.133.82-.924 0-1.407-.468-1.81-1.107l-1.693 1.053c.69 1.182 1.732 1.833 3.49 1.833 2.188 0 3.518-1.105 3.518-2.928zM10.96 11.23h1.86v7.71h-1.86v-7.71zm-2.88 0h7.62v1.54H9.94v6.17H8.08v-7.71z" fill="#3178c6"/>
  </svg>
);

const NextIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 180 180" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="nextMaskHome" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#nextMaskHome)">
      <circle cx="90" cy="90" r="90" fill="black" />
      <path d="M149.508 157.52L69.142 54H54V126H67.97V72.281L138.837 163.662C142.593 161.802 146.166 159.743 149.508 157.52Z" fill="url(#nextGradHome)" />
      <rect x="115" y="54" width="14" height="72" fill="url(#nextGradHome2)" />
    </g>
    <defs>
      <linearGradient id="nextGradHome" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nextGradHome2" x1="122" y1="54" x2="122" y2="122" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const TailwindIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38bdf8"/>
  </svg>
);

const NodeIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4.5 6.3v8.7L12 19.3l7.5-4.3V6.3L12 2zm6 12.1l-6 3.4-6-3.4V7.2l6-3.4 6 3.4v6.9z" fill="#6cc24a" stroke="#6cc24a" strokeWidth="1" />
    <path d="M12 5.5l5 2.9v5.8l-5 2.9-5-2.9v-5.8l5-2.9z" fill="#6cc24a" opacity="0.35" />
  </svg>
);

const MongoIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C11.5 2 7 6.5 7 11.5c0 4 2.5 6.5 5 8.5 2.5-2 5-4.5 5-8.5C17 6.5 12.5 2 12 2zm0 17c-1.5-1.2-3.5-3.2-3.5-6.5C8.5 9 11.2 5.2 12 4.2c.8 1 3.5 4.8 3.5 8.3 0 3.3-2 5.3-3.5 6.5z" fill="#47a248" />
    <path d="M12 22v-3.5M12 2v2.2" stroke="#47a248" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ExpressIcon = ({ size = 16, className }) => (
  <Server size={size} className={`${className} text-emerald-500`} />
);

const TechIcons = {
  React: <ReactIcon size={16} />,
  "Next.js": <NextIcon size={16} className="bg-black rounded-full" />,
  "Node.js": <NodeIcon size={16} />,
  "Express.js": <ExpressIcon size={16} />,
  MongoDB: <MongoIcon size={16} />,
  TypeScript: <TsIcon size={16} />,
  JavaScript: <JsIcon size={16} />,
  "Tailwind CSS": <TailwindIcon size={16} />,
};

const GithubIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3" />
    <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M5 10v10" />
    <path d="M10 10v10" />
    <path d="M10 15c0-2.5 1.5-4 3.5-4 2.5 0 3.5 1.5 3.5 4v5" />
  </svg>
);




const TwitterIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Home = () => {

  const socials = [
    { icon: <GithubIcon size={20} />, href: SOCIAL_LINKS.github },
    { icon: <Linkedin size={20} />, href: SOCIAL_LINKS.linkedin },
    { icon: <Globe size={20} />, href: SOCIAL_LINKS.globe },
    { icon: <TwitterIcon size={20} />, href: SOCIAL_LINKS.twitter },
    { icon: <InstagramIcon size={20} />, href: SOCIAL_LINKS.instagram },
    { icon: <Mail size={20} />, href: `mailto:${SOCIAL_LINKS.email}` },
  ];





  return (
    <div>
      <h1>Home</h1>
      <section className="relative flex flex-col items-center justify-center w-full min-h-screen pt-32 pb-16 overflow-hidden hero-bg-image">
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-black/85 via-black/55 to-black/30 md:from-black/75 md:via-black/45 md:to-transparent hero-overlay" />

      {/* Grid Layout */}
      <div className="relative z-10 grid items-center w-full grid-cols-1 gap-8 px-6 mx-auto max-w-7xl md:px-12 lg:grid-cols-12">
        
        {/* Left Column (HeroContent) */}
        {/* Left Column (HeroContent) */}
        <div className="flex flex-col space-y-6 text-left lg:col-span-8">
          <h3 className="text-xl font-medium text-gray-400 md:text-2xl">Hi, I'm</h3>
          <h1 className="text-5xl font-extrabold text-white md:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">{PROFILE.name}</span> {PROFILE.lastName}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-300">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 mr-2 rounded-full bg-emerald-400 animate-pulse" />
              {PROFILE.mainRole}
            </span>
            {PROFILE.subRoles.map((role, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="text-gray-500">|</span>
                <span>{role}</span>
              </span>
            ))}
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg">
            {PROFILE.aboutDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/#projects"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-medium rounded-xl border border-[#f59e0b]/30 shadow-[0_0_20px_rgba(217,119,6,0.2)] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-300 cursor-pointer"
            >
              <span>View My Work</span><ArrowRight size={16} />
            </Link>
            <a
              href="/My_resume_cse_portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 space-x-2 font-medium text-gray-300 transition-all duration-300 border border-gray-800 shadow-inner cursor-pointer bg-gray-900/60 rounded-xl hover:bg-gray-800 hover:text-white"
            >
              <span>Download Resume</span><Download size={16} />
            </a>
          </div>
          <div className="flex flex-col pt-8 space-y-3">
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Connect with me</span>
            <div className="flex items-center space-x-3">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0d0d10] border border-gray-800/80 rounded-xl text-gray-400 hover:text-amber-500 hover:border-amber-500/50 shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="relative z-20 flex flex-col items-center mt-12 space-y-2 transition-colors duration-300 cursor-pointer scroll-indicator"
      >
        <MousePointerClick size={18} className="animate-bounce" />
        <span className="text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
      </div>

      {/* Marquee Ticker */}
      <div className="flex flex-col w-full px-6 pt-16 mx-auto space-y-6 border-t max-w-7xl border-gray-800/40 md:px-12">
        <div className="flex items-center space-x-2 text-sm font-semibold tracking-wider text-gray-300 uppercase">
          <span className="text-amber-500">&lt;/&gt;</span><span>Tech Stack I Work With</span>
        </div>
        <div className="relative flex w-full py-2 overflow-hidden mask-linear">
          <div className="flex space-x-6 animate-[marquee_35s_linear_infinite] whitespace-nowrap min-w-full">
            {[...PROFILE.techStack, ...PROFILE.techStack].map((tech, index) => (
              <div key={index} className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-[#0b0b0d] border border-gray-800/80 rounded-xl text-sm text-gray-300 hover:border-amber-500/40 shadow-md hover:scale-105 transition-all duration-300 cursor-default marquee-item">
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{TechIcons[tech.name] || <span className="text-lg">{tech.icon}</span>}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .mask-linear { mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent); }
        
        .hero-bg-image {
          background-image: url('/hero_bg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        html.light .hero-bg-image {
          background-color: #f8fafc !important;
        }

        html.light .hero-overlay {
          background: linear-gradient(to right, rgba(248, 250, 252, 0.98) 0%, rgba(248, 250, 252, 0.93) 55%, rgba(248, 250, 252, 0.78) 100%) !important;
        }

        html.light .marquee-item {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }

        /* Terminal card theme rules */
        .terminal-card {
          background: rgba(15, 23, 42, 0.65) !important;
          backdrop-filter: blur(16px);
          border-color: rgba(245, 158, 11, 0.25) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .terminal-header {
          background: rgba(30, 41, 59, 0.8) !important;
          border-color: rgba(245, 158, 11, 0.15) !important;
        }
        .terminal-header-title {
          color: #94a3b8;
        }
        .terminal-body {
          background: rgba(15, 23, 42, 0.4) !important;
          color: #e2e8f0;
        }

        /* Light Mode Terminal overrides */
        html.light .terminal-card {
          background: rgba(255, 255, 255, 0.85) !important;
          border-color: rgba(15, 23, 42, 0.08) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
        }
        html.light .terminal-header {
          background: rgba(241, 245, 249, 0.9) !important;
          border-color: rgba(15, 23, 42, 0.06) !important;
        }
        html.light .terminal-header-title {
          color: #475569;
        }
        html.light .terminal-body {
          background: rgba(255, 255, 255, 0.5) !important;
          color: #0f172a;
        }
        html.light .terminal-body span.text-gray-200 {
          color: #1e293b !important;
        }

        /* Scroll indicator styles */
        .scroll-indicator {
          color: #94a3b8 !important;
        }
        .scroll-indicator span {
          color: #94a3b8 !important;
        }
        .scroll-indicator:hover, .scroll-indicator:hover span {
          color: #f59e0b !important;
        }
        html.light .scroll-indicator {
          color: #475569 !important;
        }
        html.light .scroll-indicator span {
          color: #475569 !important;
        }
        html.light .scroll-indicator:hover, html.light .scroll-indicator:hover span {
          color: #d97706 !important;
        }
      `}</style>
    </section>

    <div id="about">
      <About />
    </div>
    <div id="skills">
      <Skills />
    </div>
    <div id="projects">
      <Projects />
    </div>
    <div id="future-projects">
      <FutureProjects />
    </div>
    <div id="experience">
      <Experience />
    </div>
    <div id="achievements">
      <Achievements />
    </div>
    <div id="contact">
      <Contact />
    </div>

    </div>
  )
}

export default Home


