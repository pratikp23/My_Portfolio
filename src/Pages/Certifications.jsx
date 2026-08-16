import { useState, useEffect, useRef } from "react";
import { Award, ShieldCheck, ExternalLink, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "../config";
import Magnetic from "../Components/Magnetic";

const Certifications = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/certifications";

  const [activePageIndex, setActivePageIndex] = useState(0);

  const getChunkSize = (width) => {
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const [chunkSize, setChunkSize] = useState(() => {
    return typeof window !== "undefined" ? getChunkSize(window.innerWidth) : 3;
  });

  useEffect(() => {
    const handleResize = () => {
      setChunkSize(getChunkSize(window.innerWidth));
      setActivePageIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const certificationsList = [
    {
      title: "Software Development Engineer (SDE) Internship",
      issuer: "Bluestock Fintech",
      date: "Sep 2025",
      credentialId: "BFSD102899",
      image: "/cert_sde_internship_bluestock.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
    {
      title: "CCNA: Enterprise Networking, Security, and Automation",
      issuer: "Cisco Networking Academy",
      date: "Jun 10, 2026",
      credentialId: "a799a0e7-437f-4acc-9ef4-97a73c33cd96",
      image: "/cert_ccna_enterprise_networking.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco Networking Academy",
      date: "Jun 09, 2026",
      credentialId: "b966f0bd-3d7e-4fc0-bd1a-b41fdc19088a",
      image: "/cert_ccna_switching_routing.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "Basics of Data Analytics",
      issuer: "Physics Wallah / Microsoft",
      date: "Apr 27, 2026",
      credentialId: "980892f9-4865-4502-9583-fc3e6aec5514",
      image: "/cert_basics_of_data_analytics.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
    },
    {
      title: "Software Testing with AI Bootcamp",
      issuer: "Physics Wallah",
      date: "Jun 29, 2026",
      credentialId: "e6c4f735-03c0-4ab8-842b-407fdacf0c4a",
      image: "/cert_software_testing_with_ai.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
    },
    {
      title: "Apply AI: Analyze Customer Reviews",
      issuer: "Cisco Networking Academy",
      date: "May 19, 2026",
      image: "/cert_apply_ai_analyze_customer_reviews.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
    {
      title: "GenAI Course",
      issuer: "Coder Army",
      date: "Jul 10, 2026",
      image: "/cert_genai_course_coder_army.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
    },
    {
      title: "Flipkart GRiD 6.0 Certificate",
      issuer: "Flipkart",
      date: "2024",
      image: "/cert_flipkart_grid_6_0_certificate.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
    {
      title: "Introduction to Packet Tracer",
      issuer: "Cisco Networking Academy",
      date: "Jul 02, 2024",
      credentialId: "0fd9e594-7a01-438d-98d9-ca8398ff8300",
      image: "/cert_introduction_to_packet_tracer.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "Data Analytics Essentials",
      issuer: "Cisco Networking Academy",
      date: "Jun 03, 2026",
      image: "/cert_data_analytics_essentials.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
    },
    {
      title: "Introduction to Data Science",
      issuer: "Cisco Networking Academy",
      date: "Jun 03, 2026",
      image: "/cert_introduction_to_data_science.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
    },
    {
      title: "Introduction to Modern AI",
      issuer: "Cisco Networking Academy",
      date: "Apr 05, 2026",
      image: "/cert_introduction_to_modern_ai.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy / OpenEDG",
      date: "May 19, 2026",
      image: "/cert_python_essentials_1.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "Python Essentials 2",
      issuer: "Cisco Networking Academy / OpenEDG",
      date: "Jun 03, 2026",
      image: "/cert_python_essentials_2.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "Cisco AICTE Virtual Internship",
      issuer: "Cisco / AICTE",
      date: "2024",
      credentialId: "STU663b11a0b09be1715147168",
      image: "/cert_cisco_aicte_virtual_internship.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
  ];

  // Chunk certifications into pages of 3 items
  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const pages = chunkArray(certificationsList, chunkSize);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActivePageIndex((prev) => (prev + 1) % pages.length);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActivePageIndex((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      setActivePageIndex((prev) => (prev + 1) % pages.length);
    } else if (diff < -threshold) {
      setActivePageIndex((prev) => (prev - 1 + pages.length) % pages.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl relative inline-block">
            <svg className="section-curly-arrow hidden absolute -left-10 -top-8 w-9 h-9 md:-left-16 md:-top-10 md:w-14 md:h-14 scale-x-[-1] select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrow-grad-certs" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4e2a14" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99" stroke="url(#arrow-grad-certs)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Certifications</span>
            {!isStandalone && (
              <Link to="/certifications" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <svg className="w-56 h-4 mt-3 mx-auto" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brush-grad-certs" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#4e2a14" />
              </linearGradient>
            </defs>
            <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-certs)" />
            <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-certs)" opacity="0.8" />
          </svg>
          <p className="max-w-xl mx-auto font-light text-gray-400">
            Professional credentials, specialization paths, and technical milestones. Hover to flip and inspect.
          </p>
        </div>

        {/* Slider Viewport Layout */}
        <div className="relative w-full">
          
          {/* Slider Viewport Container (Dynamic responsive height bounds) */}
          <div 
            className="relative w-[90vw] sm:w-[500px] md:w-[720px] lg:w-full mx-auto overflow-hidden pt-24 pb-6 h-[500px] cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* Sliding Cards Track */}
            <div 
              className="flex w-full transition-transform duration-500 ease-in-out select-none h-full"
              style={{
                transform: `translateX(-${activePageIndex * 100}%)`
              }}
            >
              {pages.map((page, pageIdx) => (
                <div key={pageIdx} className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 h-full">
                  {page.map((cert, index) => {
                    const overallIndex = pageIdx * chunkSize + index;
                    return (
                      <div
                        key={overallIndex}
                        className="group perspective-1000 w-full h-[380px] relative cursor-pointer"
                      >
                        {/* Inner card container that rotates */}
                        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d card-rotator shadow-2xl">
                          
                          {/* Front Face: Details */}
                          <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-8 border bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm backface-hidden z-10 cert-front-card">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="p-4 border border-gray-800 bg-gray-950 rounded-2xl cert-icon-box">
                                  {cert.icon}
                                </div>
                                <span className="font-mono text-xs text-gray-500">{cert.date}</span>
                              </div>
                              
                              <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-500">
                                  {cert.title}
                                </h3>
                                <p className="text-sm font-medium text-amber-500/80">
                                  {cert.issuer}
                                </p>
                                {cert.credentialId && (
                                  <p className="font-mono text-[10px] text-gray-500">
                                    ID: {cert.credentialId}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800/40 flex items-center justify-between text-xs text-gray-400">
                              <span>Hover to view certificate</span>
                              <span className="animate-pulse text-amber-500">→</span>
                            </div>
                          </div>

                          {/* Back Face: Envelope pocket base */}
                          <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-8 border bg-gradient-to-br from-gray-950 to-black/90 rounded-3xl border-gray-800/60 backdrop-blur-sm backface-hidden rotate-y-180 z-20 cert-back-card">
                            
                            {/* Certificate Image Frame */}
                            <div className="relative w-full h-[190px] rounded-xl overflow-visible bg-transparent cert-slide-envelope">
                              {/* The actual image container that slides up */}
                              <div className="absolute inset-x-0 top-0 h-full rounded-xl overflow-hidden border border-gray-800 bg-gray-950 shadow-md cert-slide-letter">
                                <img
                                  src={cert.image}
                                  alt={cert.title}
                                  loading="lazy"
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            </div>
                            
                            {/* Card Bottom Details (pocket front) */}
                            <div className="space-y-3 pt-4 border-t border-gray-800/40 bg-transparent z-30 flex flex-col items-center">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider line-clamp-1 w-full text-center">
                                {cert.title}
                              </h4>
                              {cert.link && (
                                <Magnetic>
                                  <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition-all duration-300 font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
                                  >
                                    <span>Verify Credential</span>
                                    <ExternalLink size={12} />
                                  </a>
                                </Magnetic>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>

          {pages.length > 1 && (
            <div className="relative z-20 flex items-center justify-center gap-6 mt-6">
              {/* Left Chevron Button */}
              <Magnetic>
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-gray-950/90 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer hover:scale-105"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>
              </Magnetic>

              {/* Pagination Indicators */}
              <div className="flex gap-2">
                {pages.map((_, index) => (
                  <Magnetic key={index}>
                    <button 
                      onClick={() => setActivePageIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activePageIndex === index ? "w-6 bg-amber-500" : "w-1.5 bg-slate-800 hover:bg-slate-600"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  </Magnetic>
                ))}
              </div>

              {/* Right Chevron Button */}
              <Magnetic>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-950/90 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer hover:scale-105"
                  aria-label="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
              </Magnetic>
            </div>
          )}

        </div>

      </div>

      <style>{`
        /* 3D Flip Mechanics */
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        /* Hover triggers rotation */
        .group:hover .card-rotator {
          transform: rotateY(180deg);
        }

        /* Letter Slide Out Mechanics */
        .cert-slide-letter {
          transform: translateY(0) scale(1) rotate(0deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          z-index: 10;
        }

        /* On card hover, wait for flip to finish, then slide up with bouncy spring effect */
        .group:hover .cert-slide-letter {
          transform: translateY(-90px) scale(1.3) rotate(-2deg);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 20px rgba(245, 158, 11, 0.15);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s, box-shadow 0.6s ease 0.25s;
          z-index: 40;
        }

        /* Light Mode overrides */
        html.light .cert-front-card {
          background: rgba(255, 255, 255, 0.85) !important;
          border-color: rgba(15, 23, 42, 0.08) !important;
        }
        html.light .cert-back-card {
          background: rgba(255, 255, 255, 0.95) !important;
          border-color: rgba(15, 23, 42, 0.08) !important;
        }
        html.light .cert-icon-box {
          background: rgba(241, 245, 249, 0.9) !important;
          border-color: rgba(15, 23, 42, 0.06) !important;
        }
        html.light .cert-slide-letter {
          border-color: rgba(15, 23, 42, 0.08) !important;
          background: #f1f5f9 !important;
        }
        html.light .cert-back-card h4 {
          color: #475569 !important;
        }
        html.light .cert-front-card h3 {
          color: #1e293b !important;
        }
        html.light .cert-front-card h3:hover {
          color: #d97706 !important;
        }
        html.light .group:hover .cert-slide-letter {
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 0 20px rgba(245, 158, 11, 0.08);
        }
      `}</style>
    </div>
  );
};

export default Certifications;
