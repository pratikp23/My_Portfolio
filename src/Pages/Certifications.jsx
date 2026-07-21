import { useState, useEffect } from "react";
import { Award, ShieldCheck, ExternalLink, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "../config";
import Magnetic from "../Components/Magnetic";

const Certifications = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/certifications";

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1
  );

  useEffect(() => {
    const handleResize = () => {
      setChunkSize(window.innerWidth >= 768 ? 3 : 1);
      setActivePageIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const certificationsList = [
    {
      title: "Google Cloud Digital Leader",
      issuer: "Google Cloud",
      date: "Jun 2025",
      credentialId: "GCP-CDL-1029",
      link: "https://credential.google.com/verify",
      image: "/cert_gcp.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
    {
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "Mar 2025",
      credentialId: "META-FED-5829",
      link: "https://coursera.org/verify",
      image: "/cert_meta.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "PostgreSQL Database Administration",
      issuer: "Udemy",
      date: "Nov 2024",
      credentialId: "UC-8f3a9e",
      link: "https://udemy.com/certificate",
      image: "/cert_db.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
    },
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services (AWS)",
      date: "Aug 2025",
      credentialId: "AWS-ASA-9982",
      link: "https://aws.amazon.com/verification",
      image: "/cert_aws.png",
      icon: <Award className="text-amber-500" size={32} />,
    },
    {
      title: "Java SE 11 Developer",
      issuer: "Oracle University",
      date: "Jan 2025",
      credentialId: "ORCL-JD-4001",
      link: "https://oracle.com/verify",
      image: "/cert_java.png",
      icon: <ShieldCheck className="text-amber-500" size={32} />,
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "Dec 2024",
      credentialId: "FCC-RWD-7301",
      link: "https://freecodecamp.org/certification",
      image: "/cert_fcc.png",
      icon: <GraduationCap className="text-amber-500" size={32} />,
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

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Certifications</span>
            {!isStandalone && (
              <Link to="/certifications" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <p className="max-w-xl mx-auto font-light text-gray-400">
            Professional credentials, specialization paths, and technical milestones. Hover to flip and inspect.
          </p>
        </div>

        {/* Slider Viewport Layout */}
        <div className="relative w-full">
          
          {/* Slider Viewport Container (Dynamic responsive height bounds) */}
          <div className="relative w-[90vw] sm:w-[380px] md:w-full mx-auto overflow-hidden pt-24 pb-6 h-[500px]">
            
            {/* Sliding Cards Track */}
            <div 
              className="flex w-full transition-transform duration-500 ease-in-out select-none h-full"
              style={{
                transform: `translateX(-${activePageIndex * 100}%)`
              }}
            >
              {pages.map((page, pageIdx) => (
                <div key={pageIdx} className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4 h-full">
                  {page.map((cert, index) => {
                    const overallIndex = pageIdx * 3 + index;
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
