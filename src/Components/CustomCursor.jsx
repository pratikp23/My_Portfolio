import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [theme, setTheme] = useState(
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("light")
        ? "light"
        : "dark"
      : "dark"
  );

  // Smooth trailing spring physics for outer ring
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Direct fast coordinates for center dot
  const [rawPos, setRawPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      setRawPos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track clickable elements for magnetic expansion
    const handleTargetCheck = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer");

      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleTargetCheck, { passive: true });

    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleTargetCheck);
      observer.disconnect();
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  // Palette assignments
  // Dark: Vibrant Amber Dot & Golden Ring
  // Light: Deep Emerald Dot with Royal Purple Ring
  const dotColor =
    theme === "light" ? "bg-emerald-600" : "bg-amber-400";
  const ringBorder =
    theme === "light"
      ? "border-purple-600/70 bg-purple-500/[0.06]"
      : "border-amber-400/60 bg-amber-400/[0.05]";

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform duration-75 ${dotColor}`}
        style={{
          width: isHovered ? "6px" : "5px",
          height: isHovered ? "6px" : "5px",
          transform: `translate3d(${rawPos.x - (isHovered ? 3 : 2.5)}px, ${
            rawPos.y - (isHovered ? 3 : 2.5)
          }px, 0) scale(${isClicking ? 0.7 : 1})`,
        }}
      />

      {/* Magnetic Outer Floating Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-[border-color,background-color] duration-200 ${ringBorder}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? "44px" : "28px",
          height: isHovered ? "44px" : "28px",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          width: { duration: 0.18, ease: "easeOut" },
          height: { duration: 0.18, ease: "easeOut" },
        }}
      />
    </>
  );
}
