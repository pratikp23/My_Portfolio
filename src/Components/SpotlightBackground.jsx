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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

  // Light Mode uses Honey Amber & Slate architectural grid, Dark Mode uses Titanium Silver & Liquid Platinum
  const spotlightColor =
    theme === "light"
      ? "radial-gradient(550px circle at " +
        mousePos.x +
        "px " +
        mousePos.y +
        "px, rgba(217, 119, 6, 0.08) 0%, rgba(245, 158, 11, 0.04) 45%, transparent 75%)"
      : "radial-gradient(600px circle at " +
        mousePos.x +
        "px " +
        mousePos.y +
        "px, rgba(255, 255, 255, 0.065) 0%, rgba(203, 213, 225, 0.02) 45%, transparent 80%)";

  const gridLineColor = theme === "light" ? "rgba(15, 23, 42, 0.035)" : "rgba(255, 255, 255, 0.02)";

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 overflow-hidden"
      style={{
        opacity: opacity,
        background: `${spotlightColor}, 
                     linear-gradient(${gridLineColor} 1px, transparent 1px),
                     linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
      }}
    />
  );
}
