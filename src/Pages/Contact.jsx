import { useState } from "react";
import { Mail, MapPin, Send, Phone, Copy, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Components/Icons";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../config";

const Contact = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const [emailValidationError, setEmailValidationError] = useState("");

  // Common disposable/throwaway and fake email domains to reject
  const DISPOSABLE_EMAIL_DOMAINS = [
    "tempmail.com", "throwawaymail.com", "10minutemail.com", "guerrillamail.com",
    "sharklasers.com", "mailinator.com", "yopmail.com", "trashmail.com",
    "temp-mail.org", "fakeinbox.com", "dispostable.com", "getairmail.com",
    "mohmal.com", "generator.email", "tempail.com", "mytemp.email", "crazymailing.com"
  ];

  const validateEmailFormat = (email) => {
    const trimmed = email.trim().toLowerCase();
    
    // RFC 5322 compliant regex for strict real email structure
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address (e.g., name@domain.com).";
    }

    const [localPart, domain] = trimmed.split("@");
    if (!domain || !domain.includes(".")) {
      return "Please enter an email with a valid domain (e.g. gmail.com, outlook.com).";
    }

    // Top Level Domain must be at least 2 characters
    const parts = domain.split(".");
    const tld = parts[parts.length - 1];
    if (tld.length < 2) {
      return "The email extension is invalid (must be .com, .in, .org, etc.).";
    }

    // Block obvious spam/test patterns
    if (localPart === "test" || localPart === "fake" || localPart === "admin" || localPart === "asdf" || localPart === "1234") {
      return "Please enter your genuine working email address.";
    }

    // Block known disposable/burner domains
    if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
      return "Disposable or temporary emails are not permitted. Please provide an active email.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setEmailValidationError("");

    // Strict name validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setSubmitError("Please enter your full name (minimum 2 characters).");
      return;
    }

    // Strict email check
    const emailError = validateEmailFormat(formData.email);
    if (emailError) {
      setEmailValidationError(emailError);
      return;
    }

    // Strict message validation
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setSubmitError("Please provide a descriptive message of at least 10 characters.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      access_key: SOCIAL_LINKS.web3formsKey || "2a0e3f3b-b0b5-4b17-a420-1ada32b93a7c",
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
      subject: `New Recruiter Message from ${formData.name.trim()}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitError(result.message || "Failed to send message. Please contact me directly via email.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Failed to connect to the server. Please email me directly at " + SOCIAL_LINKS.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <span>Direct Communication</span>
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
                    <linearGradient id="arrow-grad-contact" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                    stroke="url(#arrow-grad-contact)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Touch</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-contact" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-contact)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-contact)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Interested in working together or have an engineering opportunity? Send a message or reach out directly.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/contact"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Main Grid Layout: Minimalist, Architectural, Professional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Direct Info & Professional Presence (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Let’s talk about your next project.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Whether you’re looking to hire a Full Stack Developer, explore an engineering collaboration, or just say hello — my inbox is always open.
              </p>
            </div>

            {/* Direct Contact Items */}
            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Email Address</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      title="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors block truncate"
                  >
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              {SOCIAL_LINKS.phone && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">Phone</span>
                    <a
                      href={`tel:${SOCIAL_LINKS.phone}`}
                      className="text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors block"
                    >
                      {SOCIAL_LINKS.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">Location</span>
                  <p className="text-sm font-medium text-slate-200">
                    {SOCIAL_LINKS.location} &bull; <span className="text-slate-400 font-normal">Open to Remote & Relocation</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">Connect Online</span>
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/30 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  <LinkedinIcon size={15} className="text-amber-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/30 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  <GithubIcon size={15} className="text-amber-400" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Executive Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-[#0c0e14] border border-white/[0.08] shadow-lg"
          >
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-normal mb-8">
              Fill out the form below and I will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Check size={22} />
                </div>
                <h4 className="text-base font-bold text-emerald-400 mb-1">
                  Message Sent Successfully
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 font-normal max-w-sm mx-auto">
                  Thank you for reaching out. I’ve received your message and will respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-2">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#07090e] border border-white/[0.1] focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-white placeholder-slate-500 transition-colors outline-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-300">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">Must be genuine email</span>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        handleChange(e);
                        if (emailValidationError) setEmailValidationError("");
                      }}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07090e] border text-sm text-white placeholder-slate-500 transition-colors outline-none ${
                        emailValidationError
                          ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-white/[0.1] focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      }`}
                    />
                    {emailValidationError && (
                      <p className="text-[11px] text-red-400 mt-1.5 font-medium flex items-center gap-1">
                        <span>⚠</span> {emailValidationError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-2">
                    Message <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[#07090e] border border-white/[0.1] focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-white placeholder-slate-500 transition-colors resize-none outline-none"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
                    {submitError}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
