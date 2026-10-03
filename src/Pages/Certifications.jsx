import { useState } from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

const categories = ["All", "Software Engineering", "AI & Data", "Networking & Cloud"];

const Certifications = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/certifications";

  const [activeTab, setActiveTab] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCerts =
    activeTab === "All"
      ? certificationsList
      : certificationsList.filter((c) => c.category === activeTab);

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <span>Verified Credentials</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="relative inline-block">
                <svg
                  className="section-curly-arrow absolute -left-7 -top-6 w-8 h-8 sm:-left-10 sm:-top-8 sm:w-11 sm:h-11 md:-left-12 md:-top-9 md:w-12 md:h-12 scale-x-[-1] pointer-events-none select-none"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="arrow-grad-certifications" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
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
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Certifications</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-certifications" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-certifications)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-certifications)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Coursework and verified industry credentials in SWE, AI, and computer networking.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/certifications"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCert(cert)}
              className="p-5 rounded-3xl bg-[#0e1117]/80 backdrop-blur-md border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-amber-400 border border-white/[0.06]">
                    {cert.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{cert.date}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug group-hover:text-amber-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-300 mb-3 font-normal">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="text-[10px] font-mono text-slate-500 truncate mb-4">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-amber-400">
                <span>View Certificate</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e1117] border border-white/[0.12] p-6 shadow-2xl text-left"
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
                    Credential ID: {selectedCert.credentialId}
                  </p>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-white/[0.08] mb-4">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[60vh] object-contain"
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
    </div>
  );
};

export default Certifications;
