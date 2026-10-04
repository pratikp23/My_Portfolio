import { ArrowUp } from "lucide-react";

const Signature = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden flex flex-col justify-center items-center select-none bg-[#070708] signature-section pt-16 md:pt-24 pb-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,232,240,0.03)_0%,transparent_70%)] pointer-events-none z-0 signature-glow" />

      {/* Signature Display */}
      <div className="relative z-10 flex items-center justify-center w-full px-6 mx-auto max-w-7xl mb-12 sm:mb-16">
        <span className="inline-block text-[20vw] leading-none font-bold whitespace-nowrap tracking-tighter bg-clip-text text-transparent bg-[linear-gradient(120deg,#cbd5e1_0%,#cbd5e1_35%,#000000_50%,#cbd5e1_65%,#cbd5e1_100%)] bg-[length:200%_auto] animate-[shine_5s_linear_infinite] select-none signature-text">
          PRATIK
        </span>
      </div>

      {/* Footer Bottom Strip: Copyright Left & Move to Top Right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 border-t border-white/[0.08] light:border-slate-200 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          {/* Left: Copyright */}
          <p className="text-slate-400 light:text-slate-600 tracking-wide text-center sm:text-left">
            &copy; 2026 Pratik Pathak. All rights reserved.
          </p>

          {/* Right: Move to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-400/40 text-slate-300 hover:text-amber-400 transition-all cursor-pointer group shadow-sm active:scale-95"
            aria-label="Move to top of page"
          >
            <span>Move to top</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <style>{`
        .signature-text {
          /* Edge fading effect using linear mask */
          -webkit-mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 8%,
            rgba(0, 0, 0, 1) 25%,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0.2) 92%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 8%,
            rgba(0, 0, 0, 1) 25%,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0.2) 92%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        @keyframes shine {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        /* Light Mode overrides */
        html.light .signature-section {
          background-color: #f9fafb !important;
          border-top-color: #e2e8f0 !important;
        }

        html.light .signature-glow {
          background: radial-gradient(
            circle at center,
            rgba(17, 24, 39, 0.02) 0%,
            transparent 70%
          ) !important;
        }

        html.light .signature-text {
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
          background-image: linear-gradient(
            120deg,
            #64748b 0%,
            #475569 35%,
            #0f172a 50%,
            #475569 65%,
            #64748b 100%
          ) !important;
          background-size: 200% auto !important;
          -webkit-mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 8%,
            rgba(0, 0, 0, 1) 25%,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0.2) 92%,
            rgba(0, 0, 0, 0) 100%
          ) !important;
          mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 8%,
            rgba(0, 0, 0, 1) 25%,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0.2) 92%,
            rgba(0, 0, 0, 0) 100%
          ) !important;
        }
      `}</style>
    </footer>
  );
};

export default Signature;
