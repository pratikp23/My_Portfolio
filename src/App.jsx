import { useEffect, useRef, useState, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Skills from './Pages/Skills';
import Projects from './Pages/Projects';
import Experience from './Pages/Experience';
import Certifications from './Pages/Certifications';
import Achievements from './Pages/Achievements';
import Contact from './Pages/Contact';
import Signature from './Pages/Signature';
import SpotlightBackground from './Components/SpotlightBackground';
import SocialSidebar from './Components/SocialSidebar';
import CustomCursor from './Components/CustomCursor';
import GlowCursor from './Components/GlowCursor/GlowCursor';
import SmoothScroll from './Components/SmoothScroll';
import MobileAppDock from './Components/MobileAppDock';
import ProjectDetail from './Components/projects/ProjectDetail';
import { projects } from './data/projects';

const scrollImmediateToY = (y) => {
  window.scrollTo(0, y);
  if (window.__lenis) {
    window.__lenis.scrollTo(y, { immediate: true, force: true });
  }
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;
  const isInitialMount = useRef(true);
  const prevHadBackgroundRef = useRef(Boolean(backgroundLocation));

  const [isLight, setIsLight] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('light')
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const modalSlug =
    backgroundLocation && location.pathname.startsWith('/projects/')
      ? location.pathname.slice('/projects/'.length)
      : null;
  const modalProject = modalSlug ? projects.find((p) => p.slug === modalSlug) || null : null;

  const handleCloseModal = useCallback(() => {
    const returnPath = backgroundLocation?.pathname || '/';
    const returnHash = backgroundLocation?.hash || '#projects';
    try {
      sessionStorage.removeItem('portfolio_modal_from_home');
    } catch {
      // ignore storage errors
    }
    navigate(`${returnPath}${returnHash}`, {
      replace: true,
      state: {
        keepScroll: true,
        savedScrollY: location.state?.savedScrollY,
      },
    });
  }, [navigate, backgroundLocation, location.state]);

  // Save scroll position for standalone sub-routes
  useEffect(() => {
    const activePath = backgroundLocation?.pathname || location.pathname;
    if (activePath === '/') return;
    const onScroll = () => {
      try {
        sessionStorage.setItem(`portfolio_scroll_${activePath}`, String(Math.round(window.scrollY)));
      } catch {
        // ignore storage errors
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname, backgroundLocation]);

  useEffect(() => {
    const activePath = backgroundLocation?.pathname || location.pathname;

    if (isInitialMount.current) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      isInitialMount.current = false;
      prevHadBackgroundRef.current = Boolean(backgroundLocation);

      const navEntry = performance.getEntriesByType?.('navigation')?.[0];
      const isReload = navEntry?.type === 'reload';

      let userInteracted = false;
      const markInteracted = () => {
        userInteracted = true;
      };
      window.addEventListener('wheel', markInteracted, { passive: true, once: true });
      window.addEventListener('touchstart', markInteracted, { passive: true, once: true });

      const finishRestore = () => {
        window.removeEventListener('wheel', markInteracted);
        window.removeEventListener('touchstart', markInteracted);
        window.dispatchEvent(new Event('portfolio:restored'));
      };

      if (activePath === '/') {
        let savedY = NaN;
        try {
          savedY = parseInt(sessionStorage.getItem('portfolio_home_scroll_y') || '', 10);
        } catch {
          savedY = NaN;
        }

        if (isReload && !Number.isNaN(savedY) && savedY >= 0) {
          requestAnimationFrame(() => {
            if (!userInteracted) scrollImmediateToY(savedY);
          });
          const t1 = setTimeout(() => {
            if (!userInteracted) scrollImmediateToY(savedY);
          }, 90);
          const t2 = setTimeout(() => {
            if (!userInteracted) scrollImmediateToY(savedY);
            finishRestore();
          }, 260);
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener('wheel', markInteracted);
            window.removeEventListener('touchstart', markInteracted);
          };
        }

        if (location.hash) {
          const id = location.hash.replace('#', '');
          const scrollToHash = () => {
            const element = document.getElementById(id);
            if (!element) return;
            const topOffset = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 75);
            if (!userInteracted) scrollImmediateToY(topOffset);
          };
          const t1 = setTimeout(scrollToHash, 60);
          const t2 = setTimeout(() => {
            scrollToHash();
            finishRestore();
          }, 220);
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener('wheel', markInteracted);
            window.removeEventListener('touchstart', markInteracted);
          };
        }

        const t0 = setTimeout(finishRestore, 50);
        return () => {
          clearTimeout(t0);
          window.removeEventListener('wheel', markInteracted);
          window.removeEventListener('touchstart', markInteracted);
        };
      }

      if (isReload) {
        try {
          const standaloneY = parseInt(sessionStorage.getItem(`portfolio_scroll_${activePath}`) || '', 10);
          if (!Number.isNaN(standaloneY) && standaloneY > 0) {
            const t1 = setTimeout(() => {
              if (!userInteracted) scrollImmediateToY(standaloneY);
              finishRestore();
            }, 90);
            return () => {
              clearTimeout(t1);
              window.removeEventListener('wheel', markInteracted);
              window.removeEventListener('touchstart', markInteracted);
            };
          }
        } catch {
          // ignore storage errors
        }
      }

      const tStandalone = setTimeout(finishRestore, 50);
      return () => {
        clearTimeout(tStandalone);
        window.removeEventListener('wheel', markInteracted);
        window.removeEventListener('touchstart', markInteracted);
      };
    }

    const wasModal = prevHadBackgroundRef.current;
    const isModalNow = Boolean(backgroundLocation);
    prevHadBackgroundRef.current = isModalNow;

    // Returning from standalone modal back to Home/Projects with saved pixel position
    if (typeof location.state?.restoreScrollY === 'number') {
      const targetY = location.state.restoreScrollY;
      const t1 = setTimeout(() => scrollImmediateToY(targetY), 30);
      const t2 = setTimeout(() => {
        scrollImmediateToY(targetY);
        window.dispatchEvent(new Event('portfolio:restored'));
      }, 140);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    // Never jump or move scroll when opening or closing the overlay project detail modal
    if (location.state?.keepScroll || isModalNow || wasModal) {
      return;
    }

    // Normal route / hash navigation
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const t = setTimeout(() => {
        const element = document.getElementById(id);
        if (!element) return;
        const topOffset = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 75);
        if (window.__lenis) {
          window.__lenis.scrollTo(topOffset, { duration: 1.2 });
        } else {
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(t);
    } else {
      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, backgroundLocation]);

  return (
    <div className="app-shell bg-[#08080a] min-h-screen text-slate-100 flex flex-col justify-between overflow-x-clip selection:bg-white selection:text-slate-950 pb-20 md:pb-24">
      <SmoothScroll />
      {/* Global React Bits GlowCursor: Fluid Light Trail & Click Burst */}
      <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden" aria-hidden="true">
        <GlowCursor
          color={isLight ? '#d97706' : '#f8fafc'}
          intensity={1.3}
          trailWidth={3}
          linger={1.4}
          glow={1.2}
          clickBurst
        />
      </div>
      <CustomCursor />
      <SpotlightBackground />
      <SocialSidebar />
      <Navbar />
      <MobileAppDock />
      <main className="flex-grow">
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects/:slug?" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          {/* Legacy redirect */}
          <Route path="/future-projects" element={<Navigate to="/projects" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AnimatePresence>
          {modalProject && (
            <ProjectDetail
              key={modalProject.slug}
              project={modalProject}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </main>
      <Signature />
    </div>
  );
};

export default App;
