import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import MobileAppDock from './Components/MobileAppDock';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="bg-[#08090c] min-h-screen text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-500 selection:text-slate-950 pb-16 md:pb-0">
      <CustomCursor />
      <SpotlightBackground />
      <SocialSidebar />
      <Navbar />
      <MobileAppDock />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          {/* Legacy redirect */}
          <Route path="/future-projects" element={<Navigate to="/projects" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Signature />
    </div>
  );
};

export default App;
