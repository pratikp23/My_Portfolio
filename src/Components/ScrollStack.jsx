import { useRef, useEffect, Children } from "react";

export function ScrollStackItem({
  children,
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      className={`scroll-stack-card will-change-transform ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default function ScrollStack({
  children,
  className = "",
  topOffset = 95, // Viewport distance from top when pinning (clears fixed navbar)
  itemStackDistance = 26, // Peek lip distance (px) visible above covered cards
  scaleStep = 0.04, // Scale reduction per covered card
  blurStep = 2, // Blur amount (px) per covered card
  dimStep = 0.15, // Opacity reduction per covered card
  itemGap = "mb-14 sm:mb-20", // Space between cards before they stack
}) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isReduced) return;

    let rafId = null;

    const updateStack = () => {
      const cards = cardRefs.current.filter(Boolean);
      const total = cards.length;
      if (total <= 1) return;

      const isMobile = window.innerWidth < 640;
      const activeTopOffset = isMobile ? Math.max(75, topOffset - 15) : topOffset;
      const activeStackDist = isMobile ? Math.max(18, itemStackDistance - 6) : itemStackDistance;

      for (let i = 0; i < total; i++) {
        const card = cards[i];
        let totalProgress = 0;

        // Apply sticky position dynamically if not already applied
        card.style.position = "sticky";
        card.style.top = `${activeTopOffset + i * activeStackDist}px`;
        card.style.zIndex = `${10 + i}`;
        card.style.transformOrigin = "top center";

        // Calculate influence from all cards that stack on top of card i
        for (let j = i + 1; j < total; j++) {
          const nextCard = cards[j];
          if (!nextCard) continue;

          const nextRect = nextCard.getBoundingClientRect();
          const targetTop = activeTopOffset + j * activeStackDist;
          const transitionZone = 260; // Distance over which transition interpolates
          const dist = nextRect.top - targetTop;
          const progress = Math.max(0, Math.min(1, (transitionZone - dist) / transitionZone));
          totalProgress += progress;
        }

        const scale = Math.max(0.86, 1 - totalProgress * scaleStep);
        const blur = Math.min(6, totalProgress * blurStep);
        const opacity = Math.max(0.55, 1 - totalProgress * dimStep);

        card.style.transform = `scale(${scale})`;
        card.style.filter = blur > 0.1 ? `blur(${blur}px)` : "none";
        card.style.opacity = `${opacity}`;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateStack);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Sync with Lenis if active
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    // Initial update
    updateStack();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
    };
  }, [topOffset, itemStackDistance, scaleStep, blurStep, dimStep, isReduced]);

  const items = Children.toArray(children);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {items.map((child, index) => {
        const isLast = index === items.length - 1;
        const gapClass = isLast ? "mb-0" : itemGap;

        return (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`transition-shadow duration-300 ${gapClass}`}
            style={{
              position: "sticky",
              top: `${topOffset + index * itemStackDistance}px`,
              zIndex: 10 + index,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
