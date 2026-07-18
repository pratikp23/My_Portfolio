

const Signature = () => {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden flex flex-col justify-center items-center select-none bg-[#070708] signature-section">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,232,240,0.03)_0%,transparent_70%)] pointer-events-none z-0 signature-glow" />

      <div className="relative z-10 flex items-center justify-center w-full px-6 mx-auto max-w-7xl">
        <span className="inline-block text-[20vw] leading-none font-bold whitespace-nowrap tracking-tighter bg-clip-text text-transparent bg-[linear-gradient(120deg,#cbd5e1_0%,#cbd5e1_35%,#000000_50%,#cbd5e1_65%,#cbd5e1_100%)] bg-[length:200%_auto] animate-[shine_5s_linear_infinite] select-none signature-text">
          PRATIK
        </span>
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
        }

        html.light .signature-glow {
          background: radial-gradient(
            circle at center,
            rgba(17, 24, 39, 0.02) 0%,
            transparent 70%
          ) !important;
        }

        html.light .signature-text {
          -webkit-mask-image: none !important;
          mask-image: none !important;
        }
      `}</style>
    </section>
  );
};

export default Signature;
