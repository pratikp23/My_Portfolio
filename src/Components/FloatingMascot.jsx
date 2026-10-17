import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Sparkles, Briefcase, Globe, FileText, ArrowRight, 
  Mail, ChevronRight, RotateCcw, Volume2, VolumeX, Send, CheckCircle2, Loader2 
} from "lucide-react";
import { SOCIAL_LINKS } from "../config";
import { speechService } from "../services/speechService";
import { submitLead } from "../services/leadService";

const NATURAL_HUMAN_GREETING = "Hey there! Welcome to my portfolio. I'm Pratik's digital companion. Feel free to explore my full-stack projects, download my resume, or leave me a direct note right here!";

const VOICE_GREETINGS = {
  welcome: NATURAL_HUMAN_GREETING,
  recruiter: "Welcome, hiring manager! Pratik is graduating in 2027 with practical Software Development Engineer internship experience at Bluestock Fintech. You can download his resume or check his production experience right here.",
  client: "Looking for a high-converting website or custom web app? Pratik builds fast, modern, and responsive web applications with clean architecture. Let's discuss your project!"
};

export default function FloatingMascot() {
  // Modes: 'welcome' | 'recruiter' | 'client' | 'leadForm' | 'context'
  const [activeMode, setActiveMode] = useState("welcome");
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollContextMessage, setScrollContextMessage] = useState("");
  const [waveTrigger, setWaveTrigger] = useState(0);

  // Theme observer for crisp Dark/Light mode reactivity
  const [isLight, setIsLight] = useState(
    typeof document !== "undefined" ? document.documentElement.classList.contains("light") : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Form State for Level 4 Lead Capture
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interestType: "Recruiter / Full-Time Role",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-hide bubble automatically after 6s so the user never has to close it manually
  useEffect(() => {
    if (bubbleVisible && activeMode !== "leadForm" && !isSpeaking) {
      const timer = setTimeout(() => {
        setBubbleVisible(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [bubbleVisible, activeMode, isSpeaking]);

  // Track cursor position to tilt the mascot's head towards the mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const targetX = window.innerWidth - 80;
      const targetY = window.innerHeight - 80;
      const dx = (e.clientX - targetX) / window.innerWidth;
      const dy = (e.clientY - targetY) / window.innerHeight;
      
      setMouseOffset({
        x: Math.max(-10, Math.min(10, dx * 24)),
        y: Math.max(-8, Math.min(8, dy * 20))
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Voice playback trigger
  const playVoiceForMode = (mode = activeMode) => {
    const textToSpeak = VOICE_GREETINGS[mode] || NATURAL_HUMAN_GREETING;
    speechService.speak(
      textToSpeak,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleToggleVoice = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      playVoiceForMode(activeMode);
    }
  };

  // When user clicks the mascot: Trigger wave, open bubble, AND speak voice greeting
  const handleMascotClick = () => {
    setWaveTrigger((prev) => prev + 1);
    setBubbleVisible(true);
    if (!bubbleVisible) {
      setActiveMode("welcome");
    }
    playVoiceForMode(activeMode === "leadForm" ? "welcome" : activeMode);
  };



  // Lead Submission handler
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      await submitLead(formData);
      setFormStatus("success");
      speechService.speak("Thank you! Your message has been sent directly to Pratik.");
      setTimeout(() => {
        setFormData({ name: "", email: "", interestType: "Recruiter / Full-Time Role", message: "" });
        setFormStatus("idle");
        setActiveMode("welcome");
      }, 4500);
    } catch (err) {
      setFormStatus("error");
      setErrorMessage(err.message || "Failed to submit. Please try again or email directly.");
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-40 select-none flex flex-col items-end pointer-events-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Interactive Speech & Lead Console */}
      <AnimatePresence>
        {bubbleVisible && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`mb-3 w-[295px] sm:w-[335px] p-4 rounded-2xl backdrop-blur-2xl relative transition-colors duration-300 ${
              isLight
                ? "bg-white/95 border border-amber-600/25 text-slate-900 shadow-[0_15px_35px_rgba(15,23,42,0.12),0_0_20px_rgba(217,119,6,0.12)]"
                : "bg-[#0e1117]/95 border border-amber-500/35 text-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.65),0_0_20px_rgba(245,158,11,0.18)]"
            }`}
          >
            {/* Top Toolbar: Voice Button & Close Button */}
            <div className={`flex items-center justify-between pb-2.5 mb-2.5 border-b ${
              isLight ? "border-slate-200" : "border-white/[0.08]"
            }`}>
              {/* Voice Greeting Button with Live Animated Soundwave */}
              <button
                onClick={handleToggleVoice}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  isSpeaking
                    ? isLight
                      ? "bg-amber-600 text-white shadow-[0_0_12px_rgba(217,119,6,0.35)]"
                      : "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : isLight
                    ? "bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300"
                    : "bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 border border-amber-500/30"
                }`}
                title={isSpeaking ? "Mute Voice Greeting" : "Click to hear voice greeting"}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX size={13} />
                    <span>Speaking</span>
                    <span className="flex items-center gap-0.5 ml-1">
                      <span className={`w-1 h-2.5 rounded-full animate-bounce ${isLight ? "bg-white" : "bg-slate-950"}`} />
                      <span className={`w-1 h-4 rounded-full animate-bounce [animation-delay:0.15s] ${isLight ? "bg-white" : "bg-slate-950"}`} />
                      <span className={`w-1 h-2.5 rounded-full animate-bounce [animation-delay:0.3s] ${isLight ? "bg-white" : "bg-slate-950"}`} />
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 size={13} className={isLight ? "text-amber-700" : "text-amber-400"} />
                    <span>Voice Greeting</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  speechService.stop();
                  setIsSpeaking(false);
                  setBubbleVisible(false);
                }}
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                  isLight
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 hover:text-white"
                }`}
                aria-label="Close assistant"
              >
                <X size={11} />
              </button>
            </div>

            {/* WELCOME / MAIN SCREEN */}
            {activeMode === "welcome" && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isLight ? "bg-emerald-600" : "bg-emerald-400"}`} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    isLight ? "text-amber-800" : "text-amber-400"
                  }`}>
                    Pratik.AI Assistant 👋
                  </span>
                </div>
                <p className={`text-[13px] leading-relaxed mb-3.5 font-normal ${
                  isLight ? "text-slate-700" : "text-slate-200"
                }`}>
                  Hi! I'm Pratik's interactive companion. How can I assist you today?
                </p>

                {/* Direct Action Pathways */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveMode("recruiter");
                      playVoiceForMode("recruiter");
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all group ${
                      isLight
                        ? "bg-amber-50/90 hover:bg-amber-100/90 border-amber-300 text-amber-950 shadow-sm"
                        : "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase size={14} className={isLight ? "text-amber-700" : "text-amber-400"} />
                      <span>I'm a Recruiter / Hiring</span>
                    </span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform opacity-70" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveMode("client");
                      playVoiceForMode("client");
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all group ${
                      isLight
                        ? "bg-blue-50/90 hover:bg-blue-100/90 border-blue-300 text-blue-950 shadow-sm"
                        : "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={14} className={isLight ? "text-blue-700" : "text-blue-400"} />
                      <span>I Need a Website Built</span>
                    </span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform opacity-70" />
                  </button>

                  <button
                    onClick={() => {
                      setFormData({ ...formData, interestType: "Quick Portfolio Inquiry" });
                      setActiveMode("leadForm");
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all group ${
                      isLight
                        ? "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm"
                        : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] text-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={13} className={isLight ? "text-slate-600" : "text-slate-400"} />
                      <span>Leave a Direct Message</span>
                    </span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform opacity-70" />
                  </button>
                </div>
              </div>
            )}

            {/* RECRUITER SPECIFIC SCREEN */}
            {activeMode === "recruiter" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                    isLight ? "text-amber-800" : "text-amber-400"
                  }`}>
                    <Briefcase size={12} />
                    <span>Recruiter Fast-Track</span>
                  </span>
                  <button
                    onClick={() => setActiveMode("welcome")}
                    className={`text-[10px] font-mono flex items-center gap-1 ${
                      isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <RotateCcw size={10} />
                    <span>Back</span>
                  </button>
                </div>

                <div className={`p-2.5 rounded-xl border text-xs space-y-1.5 mb-3 leading-snug ${
                  isLight
                    ? "bg-slate-50 border-slate-200 text-slate-700 shadow-inner"
                    : "bg-white/[0.04] border border-white/[0.08] text-slate-300"
                }`}>
                  <div>🎓 <strong className={isLight ? "text-slate-900" : "text-slate-100"}>B.Tech CSE (2023–27)</strong> · RGPV</div>
                  <div>💼 <strong className={isLight ? "text-slate-900" : "text-slate-100"}>Ex-SDE Intern</strong> @ Bluestock Fintech</div>
                  <div>🏆 <strong className={isLight ? "text-slate-900" : "text-slate-100"}>1st Place Winner</strong> Techno Genesis Hackathon</div>
                  <div>⚡ <strong className={isLight ? "text-slate-900" : "text-slate-100"}>Stack:</strong> React, Node, Express, Mongo, Python</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <a
                    href={SOCIAL_LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm ${
                      isLight
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-amber-500 hover:bg-amber-400 text-slate-950"
                    }`}
                  >
                    <FileText size={13} />
                    <span>View Resume</span>
                  </a>
                  <button
                    onClick={() => {
                      scrollToSection("experience");
                      setBubbleVisible(false);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-semibold text-xs transition-colors border ${
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                        : "bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/[0.12]"
                    }`}
                  >
                    <Briefcase size={13} />
                    <span>Experience</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setFormData({ ...formData, interestType: "Recruiter / Full-Time Interview" });
                    setActiveMode("leadForm");
                  }}
                  className={`w-full py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isLight
                      ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900"
                      : "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/35 text-emerald-300"
                  }`}
                >
                  <Send size={12} />
                  <span>Request Interview / Callback</span>
                </button>
              </motion.div>
            )}

            {/* CLIENT / FREELANCE SPECIFIC SCREEN */}
            {activeMode === "client" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                    isLight ? "text-blue-800" : "text-blue-400"
                  }`}>
                    <Globe size={12} />
                    <span>Hire for Web Projects</span>
                  </span>
                  <button
                    onClick={() => setActiveMode("welcome")}
                    className={`text-[10px] font-mono flex items-center gap-1 ${
                      isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <RotateCcw size={10} />
                    <span>Back</span>
                  </button>
                </div>

                <div className={`p-2.5 rounded-xl border text-xs space-y-1.5 mb-3 leading-snug ${
                  isLight
                    ? "bg-slate-50 border-slate-200 text-slate-700 shadow-inner"
                    : "bg-white/[0.04] border border-white/[0.08] text-slate-300"
                }`}>
                  <div>✨ <strong className={isLight ? "text-slate-900" : "text-slate-100"}>High-Converting Websites</strong> & Dashboards</div>
                  <div>⚡ <strong className={isLight ? "text-slate-900" : "text-slate-100"}>100% Mobile Responsive</strong> & Fast SEO</div>
                  <div>🚀 <strong className={isLight ? "text-slate-900" : "text-slate-100"}>Fast Turnaround</strong> & Clean Architecture</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, interestType: "Website / Freelance Project" });
                      setActiveMode("leadForm");
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm ${
                      isLight
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-400 text-slate-950"
                    }`}
                  >
                    <Mail size={13} />
                    <span>Get a Quote</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("projects");
                      setBubbleVisible(false);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-semibold text-xs transition-colors border ${
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                        : "bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/[0.12]"
                    }`}
                  >
                    <span>View Demos</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* LEVEL 4: DIRECT LEAD CAPTURE MODAL FORM */}
            {activeMode === "leadForm" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                    isLight ? "text-amber-800" : "text-amber-400"
                  }`}>
                    <Send size={11} />
                    <span>Instant Direct Dispatch</span>
                  </span>
                  <button
                    onClick={() => setActiveMode("welcome")}
                    className={`text-[10px] font-mono flex items-center gap-1 ${
                      isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <RotateCcw size={10} />
                    <span>Back</span>
                  </button>
                </div>

                {formStatus === "success" ? (
                  <div className="py-4 text-center space-y-2">
                    <CheckCircle2 size={32} className={`mx-auto animate-bounce ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                    <p className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Message Dispatched! 🚀</p>
                    <p className={`text-xs leading-snug ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                      Pratik has been notified directly on his phone. Expect a reply within 24 hours!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name / Company"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl text-xs outline-none transition-colors border ${
                          isLight
                            ? "bg-slate-50 border-slate-300 focus:border-amber-600 text-slate-900 placeholder-slate-400"
                            : "bg-black/40 border-white/[0.12] focus:border-amber-400 text-white placeholder-slate-500"
                        }`}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl text-xs outline-none transition-colors border ${
                          isLight
                            ? "bg-slate-50 border-slate-300 focus:border-amber-600 text-slate-900 placeholder-slate-400"
                            : "bg-black/40 border-white/[0.12] focus:border-amber-400 text-white placeholder-slate-500"
                        }`}
                      />
                    </div>
                    <div>
                      <select
                        value={formData.interestType}
                        onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-xl text-xs outline-none border ${
                          isLight
                            ? "bg-slate-50 border-slate-300 focus:border-amber-600 text-slate-900"
                            : "bg-slate-900 border-white/[0.12] focus:border-amber-400 text-slate-200"
                        }`}
                      >
                        <option value="Recruiter / Full-Time Role">👔 Recruiter (Full-Time / SDE Role)</option>
                        <option value="Recruiter / Internship">💼 Recruiter (Internship Opportunity)</option>
                        <option value="Website / Freelance Project">🚀 Client (Website / Web App Project)</option>
                        <option value="General Connect">☕ General Connect / Mentorship</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Quick note or project requirement..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl text-xs outline-none resize-none transition-colors border ${
                          isLight
                            ? "bg-slate-50 border-slate-300 focus:border-amber-600 text-slate-900 placeholder-slate-400"
                            : "bg-black/40 border-white/[0.12] focus:border-amber-400 text-white placeholder-slate-500"
                        }`}
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-[11px] text-rose-500 leading-tight">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md disabled:opacity-50 ${
                        isLight
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-[0_0_15px_rgba(217,119,6,0.25)]"
                          : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      }`}
                    >
                      {formStatus === "loading" ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>Send Directly to Pratik</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* SCROLL CONTEXT SCREEN */}
            {activeMode === "context" && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles size={13} className={`flex-shrink-0 animate-pulse ${isLight ? "text-amber-700" : "text-amber-400"}`} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    isLight ? "text-amber-800" : "text-amber-400"
                  }`}>
                    Section Tour Tip
                  </span>
                </div>
                <p className={`text-xs leading-relaxed mb-2.5 ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                  {scrollContextMessage}
                </p>
                <button
                  onClick={() => setActiveMode("welcome")}
                  className={`text-[10px] font-mono underline ${
                    isLight ? "text-amber-700 hover:text-amber-900" : "text-amber-400 hover:text-amber-300"
                  }`}
                >
                  ← See recruiter & client options
                </button>
              </motion.div>
            )}

            {/* Bubble Tail Pointer */}
            <div className={`absolute -bottom-1.5 right-8 w-3 h-3 border-r border-b transform rotate-45 ${
              isLight
                ? "bg-white border-amber-600/25"
                : "bg-[#0e1117] border-amber-500/35"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Mascot Character Avatar with Waving & Tilt Interaction */}
      {!isMinimized ? (
        <motion.div
          className="relative group cursor-pointer flex flex-col items-center"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMascotClick}
        >
          {/* Ambient Halo Glow */}
          <div className={`absolute -inset-3 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none ${
            isLight
              ? "bg-gradient-to-t from-amber-500/20 via-orange-400/10 to-transparent"
              : "bg-gradient-to-t from-amber-500/25 via-orange-500/10 to-transparent"
          }`} />

          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              speechService.stop();
              setIsSpeaking(false);
              setIsMinimized(true);
              setBubbleVisible(false);
            }}
            title="Minimize mascot"
            className={`absolute -top-1 -right-1 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 shadow-lg ${
              isLight
                ? "bg-white/95 border border-slate-300 text-slate-600 hover:text-slate-950"
                : "bg-slate-900/90 border border-white/20 text-slate-400 hover:text-white"
            }`}
          >
            <X size={10} />
          </button>

          {/* 3D Character Cutout Image with Active Waving Animation */}
          <motion.div
            key={waveTrigger}
            animate={{
              rotate: [0, 5, -5, 5, -2, 0],
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            style={{
              rotateY: mouseOffset.x,
              rotateX: -mouseOffset.y,
            }}
            className={`relative w-28 h-32 sm:w-32 sm:h-36 md:w-36 md:h-40 ${
              isLight
                ? "drop-shadow-[0_12px_24px_rgba(15,23,42,0.18)] drop-shadow-[0_0_12px_rgba(217,119,6,0.18)]"
                : "drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] drop-shadow-[0_0_15px_rgba(245,158,11,0.22)]"
            }`}
          >
            <img
              src="/mascot.png"
              alt="Pratik Pathak 3D Pixar Mascot Waving"
              className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      ) : (
        /* Minimized Floating Circle */
        <motion.button
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsMinimized(false);
            setBubbleVisible(true);
            setActiveMode("welcome");
            playVoiceForMode("welcome");
          }}
          className={`w-12 h-12 rounded-full border flex items-center justify-center relative overflow-hidden group transition-colors shadow-lg ${
            isLight
              ? "bg-white border-amber-600/30 shadow-[0_4px_20px_rgba(217,119,6,0.2)]"
              : "bg-[#0e1117] border-amber-500/40 shadow-[0_4px_22px_rgba(245,158,11,0.3)]"
          }`}
          title="Open Pratik.AI assistant"
        >
          <img
            src="/mascot.png"
            alt="Mascot Avatar"
            className="w-9 h-9 object-contain object-top mt-1"
          />
          <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-ping ${
            isLight ? "bg-amber-600" : "bg-amber-400"
          }`} />
        </motion.button>
      )}
    </div>
  );
}
