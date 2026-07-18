import { useState, useEffect } from "react";

export default function SpotlightBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [theme, setTheme] = useState(
    typeof document !== "undefined" ? (document.documentElement.classList.contains("light") ? "light" : "dark") : "dark"
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (opacity === 0) setOpacity(1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Track theme changes dynamically
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [opacity]);

  const spotlightColor = theme === "light" ? "rgba(245, 158, 11, 0.12)" : "rgba(245, 158, 11, 0.055)";
  const gridLineColor = theme === "light" ? "rgba(15, 23, 42, 0.025)" : "rgba(255, 255, 255, 0.012)";

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 spotlight-grid-container"
      style={{
        opacity: opacity,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%), 
                     linear-gradient(${gridLineColor} 1px, transparent 1px),
                     linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
      }}
    />
  );
}
