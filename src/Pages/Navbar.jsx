import { useState, useEffect, useRef } from "react";
import { Moon, Sun, ArrowUpRight, Menu, X, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL_LINKS } from "../config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isClickScrollRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    try {
      // Clear legacy stale "light" state that was trapping browsers in light mode
      const legacyTheme = localStorage.getItem("theme");
      if (legacyTheme === "light" && !localStorage.getItem("portfolio_theme_v2")) {
        localStorage.removeItem("theme");
        localStorage.setItem("portfolio_theme_v2", "dark");
      }
      const activeTheme = localStorage.getItem("portfolio_theme_v2") || "dark";
      if (activeTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        return "light";
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        return "dark";
      }
    } catch {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      return "dark";
    }
  });

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("portfolio_theme_v2", "light");
      } catch (err) {
        void err;
      }
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("portfolio_theme_v2", "dark");
      } catch (err) {
        void err;
      }
      setTheme("dark");
    }
  };

  const [activeSection, setActiveSection] = useState("home");
  const activeBgPath = location.state?.backgroundLocation?.pathname || location.pathname;
  const currentSection = activeBgPath !== "/" ? "" : activeSection;

  useEffect(() => {
    const handleScroll = () => {
      if (activeBgPath !== "/" || isClickScrollRef.current) return;

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [activeBgPath]);

  const navLinks = [
    { name: "About", path: "/#about", id: "about" },
    { name: "Experience", path: "/#experience", id: "experience" },
    { name: "Projects", path: "/#projects", id: "projects" },
    { name: "Skills", path: "/#skills", id: "skills" },
    { name: "Achievements", path: "/#achievements", id: "achievements" },
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
  }, [isOpen]);

  const handleNavLinkClick = (sectionId, e) => {
    isClickScrollRef.current = true;
    setActiveSection(sectionId);
    setIsOpen(false);

    if (location.pathname === "/") {
      if (e) e.preventDefault();
      const lenis = window.__lenis;
      if (sectionId === "home") {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      } else {
        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
          const topOffset = Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - 75);
          if (lenis) {
            lenis.scrollTo(topOffset, { duration: 1.4 });
          } else {
            window.scrollTo({ top: topOffset, behavior: "smooth" });
          }
          window.history.pushState(null, "", `/#${sectionId}`);
        }
      }
    }

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollRef.current = false;
    }, 850);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-3.5 bg-transparent border-b border-transparent pointer-events-none">
      <div className="flex items-center justify-between mx-auto pointer-events-auto max-w-7xl">
        
        {/* Brand / Logo */}
        <Link
          to="/"
          data-cursor="TOP"
          onClick={(e) => handleNavLinkClick("home", e)}
          className="relative flex items-center py-1 cursor-pointer select-none group"
          aria-label="Pratik Pathak Home"
        >
          <span className="cartoonish-nav-logo text-xl sm:text-2xl md:text-[26px] font-black tracking-tight uppercase mr-1.5 leading-none transition-transform duration-200 group-hover:scale-105">
            PRATIK
          </span>
          <span className="text-xs sm:text-sm font-mono font-medium text-slate-400 light:text-slate-500 group-hover:text-amber-400 transition-colors self-end mb-0.5">
            .OS
          </span>
        </Link>

        {/* Desktop Navigation Capsule */}
        <nav 
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-[#111115]/85 light:bg-white/90 backdrop-blur-xl border border-white/[0.08] light:border-slate-300/80 p-1.5 rounded-full shadow-lg"
        >
          <Link
            to="/"
            onClick={(e) => handleNavLinkClick("home", e)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 z-10 ${
              currentSection === "home"
                ? "text-slate-950 font-bold"
                : "text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-950"
            }`}
          >
            {currentSection === "home" && (
              <motion.span
                layoutId="activeNavPill"
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full z-[-1] shadow-[0_0_14px_rgba(245,158,11,0.35)]"
                transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
              />
            )}
            Home
          </Link>

          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavLinkClick(link.id, e)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 z-10 ${
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-950"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full z-[-1] shadow-[0_0_14px_rgba(245,158,11,0.35)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Resume Link (Prominent for recruiters) */}
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CV"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-sm"
            aria-label="View Resume in new tab"
          >
            <FileText size={13} />
            <span>Resume</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn p-2 rounded-full bg-[#111115]/85 backdrop-blur-md border border-white/[0.1] hover:border-amber-500/40 text-amber-400 hover:text-amber-300 transition-all shadow-sm cursor-pointer flex items-center justify-center"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun size={15} className="text-amber-400 transition transform hover:rotate-45" />
            ) : (
              <Moon size={15} className="text-slate-800" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full bg-[#111115]/80 backdrop-blur-md border border-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#111115]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex flex-col gap-2 max-h-[80vh] overflow-y-auto"
            data-lenis-prevent
          >
            <Link
              to="/"
              onClick={(e) => handleNavLinkClick("home", e)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavLinkClick(link.id, e)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] transition-colors w-full cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Sun size={14} className="text-amber-400" />
                  ) : (
                    <Moon size={14} className="text-slate-800" />
                  )}
                  <span>Theme: {theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Switch to {theme === "dark" ? "Light" : "Dark"}
                </span>
              </button>

              <a
                href={SOCIAL_LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 px-4 py-2 text-xs font-semibold font-bold transition-colors rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400"
              >
                <FileText size={14} />
                <span>Download / View Resume</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
