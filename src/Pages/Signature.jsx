import { Mail, FileText, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../Components/Icons";
import { SOCIAL_LINKS } from "../config";

const Signature = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#07080b] pt-16 pb-12 px-4 sm:px-6 lg:px-8 select-none overflow-hidden">
      
      {/* Ambient background glow behind the giant name */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[75vw] max-w-4xl h-[280px] bg-amber-500/[0.04] dark:bg-amber-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Navigation & Direct Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 text-xs font-mono text-slate-400">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={14} />
            <span>LinkedIn</span>
          </a>

          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 text-amber-400/90 font-semibold"
            aria-label="Resume PDF"
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>

          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30"
            aria-label="Send Email"
          >
            <Mail size={14} />
            <span>Email</span>
          </a>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent mb-6" />

        {/* Original PRATIK Large Display Signature with Shine Effect */}
        <div className="w-full overflow-hidden flex flex-col items-center justify-center my-4 sm:my-6 py-4">
          <div className="relative w-full flex items-center justify-center leading-none">
            {/* Background Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />

            <span className="signature-text-original inline-block text-[20vw] leading-none font-bold whitespace-nowrap tracking-tighter bg-clip-text text-transparent bg-[linear-gradient(120deg,#cbd5e1_0%,#cbd5e1_35%,#f59e0b_50%,#cbd5e1_65%,#cbd5e1_100%)] bg-[length:200%_auto] animate-[shine_5s_linear_infinite] select-none">
              PRATIK
            </span>
          </div>

          <p className="font-mono text-[10px] sm:text-xs text-amber-400 tracking-[0.35em] uppercase -mt-2 sm:-mt-4 mb-4 font-bold">
            Full Stack Developer &bull; CSE Student
          </p>
        </div>

        {/* Engineering Tagline */}
        <p className="text-xs text-slate-400 font-mono mb-6 flex items-center justify-center gap-2 flex-wrap">
          <span>Built with React &bull; Tailwind CSS</span>
          <span className="text-slate-600">•</span>
          <span>Designed &amp; engineered by Pratik Pathak</span>
        </p>

        {/* Copyright & Back to Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 gap-3">
          <p>&copy; {currentYear} Pratik Pathak. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Signature;
