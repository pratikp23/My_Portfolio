import { useState, useEffect, useRef } from "react";
import { Music, Moon, Sun, ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Magnetic from "../Components/Magnetic";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio object
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.25; // Soft background music volume
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio play failed:", err);
        });
    }
  };

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

  const handleLogoDoubleClick = () => {
    const pin = prompt("Enter Admin Access Pin to toggle Edit Mode:");
    if (pin === "pratik2026") {
      const current = localStorage.getItem("prtx_admin_mode") === "true";
      if (current) {
        localStorage.removeItem("prtx_admin_mode");
        alert("Admin Edit Mode Deactivated.");
        window.location.reload();
      } else {
        localStorage.setItem("prtx_admin_mode", "true");
        alert("Admin Edit Mode Activated! You can now edit your About Me photo and Projects.");
        window.location.reload();
      }
    } else if (pin !== null) {
      alert("Access Denied.");
    }
  };

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Only run scroll spy on the main landing page "/"
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "skills", "projects", "experience", "certifications", "achievements", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if we are near the top of the page (Hero section)
      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      let currentSection = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // If scrolled to the bottom of the page, force contact section highlight
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Certifications", path: "/#certifications" },
    { name: "Achievements", path: "/#achievements" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-gray-800/40 px-6 py-4 md:px-12">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Logo Style: Pratik.OS */}
          <Magnetic>
            <div
              onDoubleClick={handleLogoDoubleClick}
              title="Double-click to toggle admin mode"
              className="flex items-center space-x-1 font-mono text-xl font-bold tracking-wide cursor-pointer select-none"
            >
              <span className="text-[#f59e0b]">&lt;/&gt;</span>
              <span className="text-white">Pratik</span>
              <span className="font-normal text-gray-400">.OS</span>
            </div>
          </Magnetic>

          {/* Desktop Navigation Links (Capsule Tab Group) */}
          <div className="items-center hidden space-x-1 lg:flex bg-[#0f0f12]/40 border border-white/[0.04] p-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isHomeLink = link.path === "/";
              const hash = link.path.includes("#") ? link.path.substring(link.path.indexOf("#")) : "";
              
              const isActive = activeSection 
                ? (isHomeLink && activeSection === "home") || (hash && activeSection === hash.replace("#", ""))
                : link.path.includes('#')
                  ? location.hash === hash
                  : location.pathname === link.path && !location.hash;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 z-10 ${
                    isActive ? "text-slate-950 font-bold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-amber-500 rounded-full z-[-1] shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Controls & CTA */}
          <div className="items-center hidden space-x-4 lg:flex">
            {/* Ambient Audio Button */}
            <Magnetic>
              <button 
                onClick={togglePlay}
                className={`p-2.5 border rounded-full transition-all duration-300 shadow-inner relative flex items-center justify-center cursor-pointer ${
                  isPlaying 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                    : "bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                }`}
                aria-label="Toggle background music"
              >
                <Music size={16} className={isPlaying ? "animate-pulse text-amber-500" : ""} />
                {isPlaying && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full">
                    <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                  </span>
                )}
              </button>
            </Magnetic>

            {/* Theme Toggle Button */}
            <Magnetic>
              <button 
                onClick={toggleTheme}
                className="p-2.5 bg-gray-900/60 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-gray-700 transition-all shadow-inner"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </Magnetic>

            {/* "Let's Talk" CTA Button with Amber Gradient & Glow */}
            <Magnetic>
              <Link
                to="/#contact"
                className="
                              flex items-center space-x-2 
                              px-5 py-2.5 
                              text-white 
                              font-medium 
                              text-sm 
                              rounded-xl 
                              border border-[#f59e0b]/30
                              shadow-[0_0_15px_rgba(217,119,6,0.15)]
                              hover:shadow-[0_0_25px_rgba(217,119,6,0.35)]
                              transition-all duration-300

                              bg-gradient-to-l
                              from-[#6b3e1e]
                              to-[#f97316]
                              "
              >
                <span>Let's Talk</span>

                <ArrowRight size={14} />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 bg-gray-900 border border-gray-800 rounded-full"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0c] border-b border-gray-800 px-6 py-6 space-y-4 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
            {navLinks.map((link) => {
              const isHomeLink = link.path === "/";
              const hash = link.path.includes("#") ? link.path.substring(link.path.indexOf("#")) : "";
              
              const isActive = activeSection 
                ? (isHomeLink && activeSection === "home") || (hash && activeSection === hash.replace("#", ""))
                : link.path.includes('#')
                  ? location.hash === hash
                  : location.pathname === link.path && !location.hash;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium ${
                    isActive ? "text-[#f59e0b]" : "text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <button 
                onClick={togglePlay}
                className={`flex items-center p-2 space-x-2 transition-colors cursor-pointer ${
                  isPlaying ? "text-amber-500" : "text-gray-400 hover:text-white"
                }`}
              >
                <Music size={16} className={isPlaying ? "animate-pulse" : ""} />
                <span className="text-sm font-medium">
                  {isPlaying ? "Mute Background Music" : "Play Background Music"}
                </span>
              </button>
              <Link
                to="/#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white text-sm rounded-xl"
              >
                <span className="text-[#d6a15d]">Let's Talk</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

