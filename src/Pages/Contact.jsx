import { useState } from "react";
import { Mail, MapPin, Send, MessageSquare, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "../config";
import Magnetic from "../Components/Magnetic";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      access_key: SOCIAL_LINKS.web3formsKey || "YOUR_ACCESS_KEY_HERE",
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: `New Portfolio Message from ${formData.name}`,
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
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Touch</span>
            {!isStandalone && (
              <Link to="/contact" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <p className="max-w-xl mx-auto font-light text-gray-400">
            Have a question, proposal, or want to collaborate? Drop a message below.
          </p>
        </div>

        <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Contact Details Card */}
          <div className="p-6 sm:p-8 space-y-8 border shadow-2xl lg:col-span-5 bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm">
            <h3 className="mb-6 text-2xl font-bold text-white">Contact Info</h3>
            
            <Magnetic className="w-full">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-4 cursor-pointer group w-full"
              >
                <div className="p-3 transition-colors border border-gray-800 bg-gray-950 rounded-xl text-amber-500 group-hover:border-amber-500">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Email Me</h4>
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-amber-500">{SOCIAL_LINKS.email}</p>
                </div>
              </a>
            </Magnetic>

            {SOCIAL_LINKS.phone && (
              <Magnetic className="w-full">
                <a
                  href={`tel:${SOCIAL_LINKS.phone}`}
                  className="flex items-center gap-4 cursor-pointer group w-full"
                >
                  <div className="p-3 transition-colors border border-gray-800 bg-gray-950 rounded-xl text-amber-500 group-hover:border-amber-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Call Me</h4>
                    <p className="text-sm font-medium text-white transition-colors group-hover:text-amber-500">{SOCIAL_LINKS.phone}</p>
                  </div>
                </a>
              </Magnetic>
            )}

            <div className="flex items-center gap-4">
              <div className="p-3 border border-gray-800 bg-gray-950 rounded-xl text-amber-500">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Location</h4>
                <p className="text-sm font-medium text-white">{SOCIAL_LINKS.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 border border-gray-800 bg-gray-950 rounded-xl text-amber-500">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Response Time</h4>
                <p className="text-sm font-medium text-white">Within 24 Hours</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#0b0b0d] border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-md w-full">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 text-3xl border rounded-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="max-w-sm text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 text-white transition-colors border border-gray-800 bg-gray-950 rounded-xl placeholder-gray-650 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 text-white transition-colors border border-gray-800 bg-gray-950 rounded-xl placeholder-gray-650 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 text-white transition-colors border border-gray-800 resize-none bg-gray-950 rounded-xl placeholder-gray-650 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 font-medium font-mono pb-2">{submitError}</p>
                )}

                <Magnetic className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-medium rounded-xl border border-[#f59e0b]/30 shadow-[0_0_20px_rgba(217,119,6,0.15)] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                    <Send size={16} />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
