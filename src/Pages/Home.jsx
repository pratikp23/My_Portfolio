
import { Mail, ArrowRight, Download, MousePointerClick, Globe } from 'lucide-react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import FutureProjects from './FutureProjects';
import Experience from './Experience';
import Certifications from './Certifications';
import Achievements from './Achievements';
import Contact from './Contact';

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
    { icon: <GithubIcon size={20} />, href: "https://github.com" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
    { icon: <Globe size={20} />, href: "https://pratikpathak.dev" },
    { icon: <TwitterIcon size={20} />, href: "https://x.com" },
    { icon: <InstagramIcon size={20} />, href: "https://instagram.com" },
    { icon: <Mail size={20} />, href: "mailto:pratikpathak.dev@gmail.com" },
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "Express.js", icon: "🚂" },
    { name: "MongoDB", icon: "🍃" },
    { name: "TypeScript", icon: "🔷" },
    { name: "JavaScript", icon: "🟨" },
    { name: "Tailwind CSS", icon: "🌊" },
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
        <div className="flex flex-col space-y-6 text-left lg:col-span-9">
          <h3 className="text-xl font-medium text-gray-400 md:text-2xl">Hi, I'm</h3>
          <h1 className="text-5xl font-extrabold text-white md:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">Pratik</span> Pathak
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-300">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 mr-2 rounded-full bg-emerald-400 animate-pulse" />
              Full Stack Developer
            </span>
            <span className="text-gray-500">|</span><span>CSE Student</span><span className="text-gray-500">|</span><span>Problem Solver</span>
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg">
            I build scalable web apps and AI-powered systems that solve real-world problems.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-medium rounded-xl border border-[#f59e0b]/30 shadow-[0_0_20px_rgba(217,119,6,0.2)] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-300 cursor-pointer"
            >
              <span>View My Work</span><ArrowRight size={16} />
            </button>
            <a
              href="/resume.pdf"
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
      <div className="flex flex-col w-full px-6 pt-16 mx-auto space-y-6 max-w-7xl md:px-12">
        <div className="flex items-center space-x-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
          <span className="text-amber-500">&lt;/&gt;</span><span>Tech Stack I Work With</span>
        </div>
        <div className="relative flex w-full py-2 overflow-hidden mask-linear">
          <div className="flex space-x-6 animate-[marquee_35s_linear_infinite] whitespace-nowrap min-w-full">
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0b0b0d] border border-gray-800/80 rounded-xl text-sm text-gray-300 hover:border-amber-500/40 shadow-md">
                <span className="text-lg">{tech.icon}</span><span className="font-medium">{tech.name}</span>
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
    <div id="certifications">
      <Certifications />
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


