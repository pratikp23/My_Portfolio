import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, Briefcase, FolderGit2, Wrench, Trophy, Mail, FileText } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { SOCIAL_LINKS } from "../config";

const DOCK_NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, cursor: "TOP" },
  { id: "about", label: "About", icon: User, cursor: "" },
  { id: "experience", label: "Work", icon: Briefcase, cursor: "" },
  { id: "projects", label: "Projects", icon: FolderGit2, cursor: "VIEW" },
  { id: "skills", label: "Skills", icon: Wrench, cursor: "" },
  { id: "achievements", label: "Awards", icon: Trophy, cursor: "" },
  { id: "contact", label: "Contact", icon: Mail, cursor: "HI" },
];

function DockDesktopIcon({ mouseX, item, isActive, onClick, isReduced }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-130, 0, 130], [42, 66, 42]);
  const heightTransform = useTransform(distance, [-130, 0, 130], [42, 66, 42]);
  const iconScaleTransform = useTransform(distance, [-130, 0, 130], [1, 1.4, 1]);

  const springConfig = { mass: 0.1, stiffness: 180, damping: 14 };
  const width = useSpring(isReduced ? 42 : widthTransform, springConfig);
  const height = useSpring(isReduced ? 42 : heightTransform, springConfig);
  const iconScale = useSpring(isReduced ? 1 : iconScaleTransform, springConfig);

  const Icon = item.icon;

  if (item.isLink) {
    return (
      <div className="relative flex items-center justify-center">
        <motion.a
          ref={ref}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={item.cursor}
          style={{ width, height }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="rounded-2xl flex items-center justify-center bg-white/[0.04] hover:bg-amber-500/15 border border-white/[0.08] hover:border-amber-500/50 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer relative shadow-sm"
          aria-label={item.label}
        >
          <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
            <Icon size={18} />
          </motion.div>
        </motion.a>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[#111115] text-white border border-white/[0.12] shadow-xl pointer-events-none whitespace-nowrap absolute left-1/2 -top-9 z-50 flex items-center gap-1"
            >
              <span>{item.label}</span>
              <span className="text-amber-400">↗</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        ref={ref}
        type="button"
        onClick={() => onClick(item.id)}
        data-cursor={item.cursor}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`rounded-2xl flex items-center justify-center transition-colors cursor-pointer relative shadow-sm ${
          isActive
            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            : "bg-white/[0.04] hover:bg-white/[0.09] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20"
        }`}
        aria-label={`Navigate to ${item.label}`}
      >
        <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
          <Icon size={18} />
        </motion.div>

        {/* Active glowing indicator dot */}
        {isActive && (
          <motion.div
            layoutId="dockActiveDot"
            className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.15 }}
            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[#111115] text-white border border-white/[0.12] shadow-xl pointer-events-none whitespace-nowrap absolute left-1/2 -top-9 z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileAppDock() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeBgPath = location.state?.backgroundLocation?.pathname || location.pathname;
  const [activeSection, setActiveSection] = useState("home");
  const mouseX = useMotionValue(Infinity);
  const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll spy to highlight active section using viewport bounding rects
  useEffect(() => {
    const handleScroll = () => {
      if (activeBgPath !== "/") {
        setActiveSection(activeBgPath.split("/")[1] || "home");
        return;
      }

      if (window.scrollY < 160) {
        setActiveSection("home");
        return;
      }

      const threshold = window.innerHeight * 0.42;
      const sections = ["about", "projects", "skills", "achievements", "certifications", "contact"];
      let detected = "home";

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > 60) {
          detected = sections[i];
          break;
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
  }, [activeBgPath]);

  const handleDockClick = (sectionId) => {
    setActiveSection(sectionId);
    if (location.pathname !== "/") {
      navigate(sectionId === "home" ? "/" : `/#${sectionId}`);
      return;
    }

    const lenis = window.__lenis;
    if (sectionId === "home") {
      if (lenis) lenis.scrollTo(0, { duration: 1.6 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const topOffset = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 75);
        if (lenis) {
          lenis.scrollTo(topOffset, { duration: 1.4 });
        } else {
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
        window.history.pushState(null, "", `/#${sectionId}`);
      }
    }
  };

  const resumeItem = {
    id: "resume",
    label: "Resume (CV)",
    icon: FileText,
    isLink: true,
    href: SOCIAL_LINKS.resume,
    cursor: "CV",
  };

  return (
    <>
      {/* DESKTOP FLOATING DOCK (macOS Style Magnification - Aceternity Inspired) */}
      <div className="hidden md:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none">
        <motion.nav
          aria-label="Floating Navigation Dock"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-2 p-2 rounded-3xl bg-[#111115]/85 backdrop-blur-2xl border border-white/[0.1] shadow-[0_12px_45px_rgba(0,0,0,0.65)]"
        >
          {DOCK_NAV_ITEMS.map((item) => (
            <DockDesktopIcon
              key={item.id}
              mouseX={mouseX}
              item={item}
              isActive={activeSection === item.id}
              onClick={handleDockClick}
              isReduced={isReduced}
            />
          ))}

          {/* Vertical Separator */}
          <div className="w-[1px] h-6 bg-white/[0.12] self-center mx-1" />

          {/* Direct Resume PDF Launcher */}
          <DockDesktopIcon
            mouseX={mouseX}
            item={resumeItem}
            isActive={false}
            onClick={() => {}}
            isReduced={isReduced}
          />
        </motion.nav>
      </div>

      {/* MOBILE APP DOCK (Compact Bottom Bar) */}
      <div className="md:hidden fixed bottom-3 left-0 right-0 z-40 px-3 pointer-events-none select-none">
        <nav
          aria-label="Mobile App Dock Navigation"
          className="pointer-events-auto max-w-[390px] mx-auto bg-[#111115]/92 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center justify-around"
        >
          {DOCK_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleDockClick(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive ? "text-amber-400 font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
                aria-label={`Navigate to ${item.label}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileDockActivePill"
                    className="absolute inset-0 bg-amber-500/15 border border-amber-500/30 rounded-xl"
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

          {/* Quick Resume Direct Launcher in Mobile Dock */}
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CV"
            className="relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 hover:text-amber-400 transition-colors"
            aria-label="Open Resume"
          >
            <FileText size={17} className="transition-transform active:scale-90" />
            <span className="text-[9px] font-mono tracking-tight mt-0.5 leading-none text-amber-400/90 font-medium">
              CV
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
