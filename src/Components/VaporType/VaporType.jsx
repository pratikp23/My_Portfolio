import { useState, useEffect, useRef } from "react";
import "./VaporType.css";

/**
 * VaporType - React Bits Inspired Component
 * "Words that condense out of vapor and drift away"
 *
 * Props:
 * - text: Plain string or words prefix
 * - gradientText: Amber gradient accented words/suffix
 * - as: HTML element tag (h1, h2, h3, span, etc. Default: 'h2')
 * - className: Extra styling classes
 * - delay: Base delay before condensation begins (in seconds, default: 0.1)
 * - stagger: Seconds between each word condensing (default: 0.08)
 * - drift: Whether to maintain subtle atmospheric vapor drift after condensing (default: true)
 */
export default function VaporType({
  text = "",
  gradientText = "",
  as: Component = "h2",
  className = "",
  delay = 0.1,
  stagger = 0.08,
  drift = true,
  children,
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const elementRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;
    const el = elementRef.current;
    if (!el) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    // Trigger condensation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: "40px" }
    );

    observer.observe(el);

    // Safety fallback ensures heading is NEVER invisible even if observer timing is off
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [isVisible]);

  // Split plain text and gradient text into individual word units
  const plainWords = text ? text.trim().split(/\s+/) : [];
  const gradWords = gradientText ? gradientText.trim().split(/\s+/) : [];

  let wordIndex = 0;

  return (
    <Component
      ref={elementRef}
      className={`vapor-type ${className}`.trim()}
    >
      {plainWords.map((word, i) => {
        const currentIdx = wordIndex++;
        const animDelay = isVisible ? `${delay + currentIdx * stagger}s` : "0s";
        const driftDelay = isVisible
          ? `${delay + currentIdx * stagger + 0.95 + i * 0.4}s`
          : "0s";

        return (
          <span
            key={`plain-${i}`}
            className={`vapor-word ${
              isVisible
                ? drift
                  ? "vapor-word--drifting"
                  : "vapor-word--condensing"
                : "opacity-0"
            }`}
            style={{
              animationDelay: `${animDelay}, ${driftDelay}`,
            }}
          >
            {word}&nbsp;
          </span>
        );
      })}

      {gradWords.map((word, i) => {
        const currentIdx = wordIndex++;
        const animDelay = isVisible ? `${delay + currentIdx * stagger}s` : "0s";
        const driftDelay = isVisible
          ? `${delay + currentIdx * stagger + 0.95 + (plainWords.length + i) * 0.4}s`
          : "0s";

        return (
          <span
            key={`grad-${i}`}
            className={`vapor-word vapor-word--gradient ${
              isVisible
                ? drift
                  ? "vapor-word--drifting"
                  : "vapor-word--condensing"
                : "opacity-0"
            }`}
            style={{
              animationDelay: `${animDelay}, ${driftDelay}`,
            }}
          >
            {word}
            {i < gradWords.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}

      {children}
    </Component>
  );
}
