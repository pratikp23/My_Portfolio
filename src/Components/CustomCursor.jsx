import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const [label, setLabel] = useState("");
  const reduced = useReducedMotion();

  // Coordinates start at (-100, -100)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // DOT: useSpring on mouse x/y with { stiffness: 500, damping: 40, mass: 0.6 }
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  // RING: useSpring with { stiffness: 120, damping: 20 }, visibly trailing the dot
  const rx = useSpring(x, { stiffness: 120, damping: 20 });
  const ry = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") || "" : "");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  // On touch devices render nothing
  if (!enabled) return null;

  const big = Boolean(label);

  return (
    <>
      {/* Hide native cursor in media query */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, [data-cursor] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* DOT: 8px circle, solid colour, centered with translate(-50%,-50%), z-index 9999 */}
      <motion.div
        style={{
          x: sx,
          y: sy,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--cursor-color, #c8f542)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* RING: 36px circle, 1px border (same colour at 60% opacity), transparent fill, z-index 9998.
          On non-empty data-cursor, animates to 84px x 84px with near-solid fill (95% opacity), centered label. */}
      <motion.div
        style={{
          x: rx,
          y: ry,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            width: big ? 84 : 36,
            height: big ? 84 : 36,
            backgroundColor: big
              ? "color-mix(in srgb, var(--cursor-color, #c8f542) 95%, transparent)"
              : "transparent",
          }}
          transition={{
            duration: reduced ? 0 : 0.3,
            ease: EASE,
          }}
          style={{
            borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--cursor-color, #c8f542) 60%, transparent)",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {big && (
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#07070c",
                fontWeight: 600,
                fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
                lineHeight: 1,
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
