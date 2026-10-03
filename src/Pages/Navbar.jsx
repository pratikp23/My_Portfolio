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
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      return "light";
    } else {
      document.documentElement.classList.remove("light");
      return "dark";
    }
  });

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const [activeSection, setActiveSection] = useState("home");
  const currentSection = location.pathname !== "/" ? "" : activeSection;

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/" || isClickScrollRef.current) return;

      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: "About", path: "/#about", id: "about" },
    { name: "Experience", path: "/#experience", id: "experience" },
    { name: "Projects", path: "/#projects", id: "projects" },
    { name: "Skills", path: "/#skills", id: "skills" },
    { name: "Achievements", path: "/#achievements", id: "achievements" },
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  const handleNavLinkClick = (sectionId, e) => {
    isClickScrollRef.current = true;
    setActiveSection(sectionId);
    setIsOpen(false);

    if (location.pathname === "/") {
      if (e) e.preventDefault();
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      } else {
        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
          const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 75;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
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
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavLinkClick("home", e)}
          className="group flex items-center py-1 cursor-pointer select-none relative"
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
          className="hidden md:flex items-center gap-1 bg-[#0e1117]/85 light:bg-white/90 backdrop-blur-xl border border-white/[0.08] light:border-slate-300/80 p-1.5 rounded-full shadow-lg"
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
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-[-1] shadow-[0_0_14px_rgba(245,158,11,0.4)]"
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
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-[-1] shadow-[0_0_14px_rgba(245,158,11,0.4)]"
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
            className="p-2 rounded-full bg-[#0e1117]/80 backdrop-blur-md border border-white/[0.08] hover:border-white/20 text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full bg-[#0e1117]/80 backdrop-blur-md border border-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
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
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#0e1117]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex flex-col gap-2"
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

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
              <a
                href={SOCIAL_LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors w-full justify-center"
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
