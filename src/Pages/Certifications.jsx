import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BounceCards from "../Components/BounceCards/BounceCards";
import SectionParticleHeading from "../Components/SectionParticleHeading";

const certificationsList = [
  {
    title: "Software Development Engineer (SDE) Internship",
    issuer: "Bluestock Fintech",
    date: "Sep 2025",
    category: "Software Engineering",
    credentialId: "BFSD102899",
    image: "/cert_sde_internship_bluestock.png",
  },
  {
    title: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    date: "Jun 2026",
    category: "Networking & Cloud",
    credentialId: "a799a0e7-437f-4acc-9ef4-97a73c33cd96",
    image: "/cert_ccna_enterprise_networking.png",
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "Jun 2026",
    category: "Networking & Cloud",
    credentialId: "b966f0bd-3d7e-4fc0-bd1a-b41fdc19088a",
    image: "/cert_ccna_switching_routing.png",
  },
  {
    title: "Basics of Data Analytics",
    issuer: "Physics Wallah / Microsoft",
    date: "Apr 2026",
    category: "AI & Data",
    credentialId: "980892f9-4865-4502-9583-fc3e6aec5514",
    image: "/cert_basics_of_data_analytics.png",
  },
  {
    title: "Software Testing with AI Bootcamp",
    issuer: "Physics Wallah",
    date: "Jun 2026",
    category: "Software Engineering",
    credentialId: "e6c4f735-03c0-4ab8-842b-407fdacf0c4a",
    image: "/cert_software_testing_with_ai.png",
  },
  {
    title: "Apply AI: Analyze Customer Reviews",
    issuer: "Cisco Networking Academy",
    date: "May 2026",
    category: "AI & Data",
    image: "/cert_apply_ai_analyze_customer_reviews.png",
  },
  {
    title: "GenAI Course",
    issuer: "Coder Army",
    date: "Jul 2026",
    category: "AI & Data",
    image: "/cert_genai_course_coder_army.png",
  },
  {
    title: "Flipkart GRiD 6.0 Certificate",
    issuer: "Flipkart",
    date: "2024",
    category: "Software Engineering",
    image: "/cert_flipkart_grid_6_0_certificate.png",
  },
  {
    title: "Introduction to Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Jul 2024",
    category: "Networking & Cloud",
    credentialId: "0fd9e594-7a01-438d-98d9-ca8398ff8300",
    image: "/cert_introduction_to_packet_tracer.png",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Jun 2026",
    category: "AI & Data",
    image: "/cert_data_analytics_essentials.png",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "Jun 2026",
    category: "AI & Data",
    image: "/cert_introduction_to_data_science.png",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "Apr 2026",
    category: "AI & Data",
    image: "/cert_introduction_to_modern_ai.png",
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco Networking Academy / OpenEDG",
    date: "May - Jun 2026",
    category: "Software Engineering",
    image: "/cert_python_essentials_1.png",
  },
  {
    title: "Cisco AICTE Virtual Internship",
    issuer: "Cisco / AICTE",
    date: "2024",
    category: "Software Engineering",
    credentialId: "STU663b11a0b09be1715147168",
    image: "/cert_cisco_aicte_virtual_internship.png",
  },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Responsive calculations for BounceCards container and card sizing
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Stop Lenis smooth scroll while inspecting certificate modal
  useEffect(() => {
    if (selectedCert) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
  }, [selectedCert]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  // Map certificates to BounceCards images format
  const bounceImages = certificationsList.map((cert) => ({
    src: cert.image,
    alt: cert.title,
  }));

  const count = certificationsList.length;
  const containerWidth = isMobile
    ? Math.min(windowWidth - 24, 380)
    : isTablet
    ? Math.min(windowWidth - 48, 640)
    : 860;

  const containerHeight = isMobile ? 260 : isTablet ? 320 : 380;
  const cardSize = isMobile ? 140 : isTablet ? 175 : 220;
  const maxSpreadAllowed =
    count > 1 ? Math.floor((containerWidth - cardSize - 16) / (count - 1)) : 80;
  const baseSpread = isMobile ? 36 : isTablet ? 55 : 68;
  const spread = Math.max(16, Math.min(baseSpread, maxSpreadAllowed));
  const pushDistance = isMobile ? 75 : isTablet ? 115 : 150;
  const rotation = isMobile ? 7 : 9;
  const arc = isMobile ? -6 : -10;

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:pl-20 md:pr-8 xl:px-8 text-white overflow-x-clip">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header Only */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="relative inline-block">
            <svg
              className="section-curly-arrow absolute -left-4 -top-6 w-7 h-7 sm:-left-10 sm:-top-8 sm:w-11 sm:h-11 md:-left-12 md:-top-9 md:w-12 md:h-12 scale-x-[-1] pointer-events-none select-none"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="arrow-grad-certifications" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
              </defs>
              <path
                d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                stroke="url(#arrow-grad-certifications)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <SectionParticleHeading text="LICENSES & CERTIFICATIONS" align="center" maxWidth="max-w-xl mx-auto" />
          </div>
          <svg
            className="w-48 sm:w-56 h-3 mt-2 mx-auto select-none pointer-events-none"
            viewBox="0 0 300 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="brush-grad-certifications" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="60%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
              <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-certifications)" />
              <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-certifications)" opacity="0.8" />
            </svg>
        </div>

        {/* The Cards (Kept directly outside any card/stage div box) */}
        <div className="w-full flex items-center justify-center overflow-visible">
          <BounceCards
            images={bounceImages}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            cardSize={cardSize}
            spread={spread}
            rotation={rotation}
            arc={arc}
            pushDistance={pushDistance}
            hoverScale={1.08}
            bounciness={0.65}
            animationDelay={0.2}
            animationStagger={0.05}
            borderWidth={4}
            borderColor="#1c1917"
            radius={20}
            shadow
            enableHover
            onCardClick={(idx) => {
              if (certificationsList[idx]) {
                setSelectedCert(certificationsList[idx]);
              }
            }}
          />
        </div>

      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              data-lenis-prevent
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111115] border border-white/[0.12] p-6 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {selectedCert.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{selectedCert.title}</h3>
                <p className="text-xs text-slate-300">{selectedCert.issuer} • {selectedCert.date}</p>
                {selectedCert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    Credential ID: <span className="text-amber-400">{selectedCert.credentialId}</span>
                  </p>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-white/[0.08] mb-4">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-white transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
