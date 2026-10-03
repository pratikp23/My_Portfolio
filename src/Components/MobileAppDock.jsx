import { useState, useEffect } from "react";
import { Home, User, Briefcase, FolderGit2, Wrench, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../config";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Work", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function MobileAppDock() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      const sections = ["about", "experience", "projects", "skills", "achievements", "certifications", "contact"];
      let detected = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            detected = sectionId;
            break;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        detected = "contact";
      }

      setActiveSection(detected);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDockClick = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const topOffset = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
        window.history.pushState(null, "", `/#${sectionId}`);
      }
    }
  };

  return (
    <div className="md:hidden fixed bottom-3 left-0 right-0 z-40 px-3 pointer-events-none select-none">
      <nav 
        aria-label="Mobile App Dock Navigation"
        className="pointer-events-auto max-w-[390px] mx-auto bg-[#0a0c10]/90 light:bg-white/95 backdrop-blur-2xl border border-white/[0.12] light:border-slate-300/90 rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.55)] light:shadow-[0_10px_30px_rgba(15,23,42,0.15)] flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleDockClick(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-amber-400 font-bold"
                  : "text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900"
              }`}
              aria-label={`Navigate to ${item.label}`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileDockActivePill"
                  className="absolute inset-0 bg-amber-500/15 light:bg-amber-500/20 border border-amber-500/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon size={18} className="relative z-10 transition-transform active:scale-90" />
              <span className="relative z-10 text-[9px] font-mono tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Quick Resume direct launcher in dock */}
        <a
          href={SOCIAL_LINKS.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 light:text-slate-700 hover:text-amber-400 transition-colors"
          aria-label="Open Resume"
        >
          <FileText size={17} className="transition-transform active:scale-90" />
          <span className="text-[9px] font-mono tracking-tight mt-0.5 leading-none text-amber-400/90 font-medium">
            CV
          </span>
        </a>
      </nav>
    </div>
  );
}
