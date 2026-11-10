import { memo, useEffect, useMemo, useState } from "react";
import LogoLoop from "./LogoLoop/LogoLoop";

// Crisp 1em vector brand logos for the 12 TechSwapCloud technologies (monochrome by default, brand color on hover)
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.5 23 21" height="1em" width="1.1em" fill="none" aria-hidden="true">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.05" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 24 24" height="1em" width="1em" fill="currentColor" fillRule="evenodd" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12A12 12 0 0 0 18.665 21.978L8.815 9.23v7.566H7.2V7.2h2.019l10.714 13.801A12 12 0 0 0 24 12c0-6.627-5.373-12-12-12Zm3.333 7.2h1.6v8.306l-1.6-2.061V7.2Z" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="195 165 210 210" height="1em" width="1em" fill="currentColor" fillRule="evenodd" aria-hidden="true">
    <path d="M 223 165 H 377 A 28 28 0 0 1 405 193 V 347 A 28 28 0 0 1 377 375 H 223 A 28 28 0 0 1 195 347 V 193 A 28 28 0 0 1 223 165 Z M 230 226 H 290 V 244 H 269 V 328 H 251 V 244 H 230 Z M 305 304 C 310 322 325 330 344 330 C 362 330 374 320 374 308 C 374 295 363 288 347 283 L 335 279 C 316 273 302 263 302 245 C 302 225 320 212 342 212 C 364 212 379 224 382 242 L 364 246 C 361 234 353 228 342 228 C 331 228 322 235 322 244 C 322 254 331 259 344 263 L 356 267 C 378 274 394 285 394 308 C 394 330 374 346 344 346 C 318 346 300 331 296 306 Z" />
  </svg>
);

const NodeLogo = () => (
  <svg viewBox="-11 -11 22 22" height="1em" width="1em" fill="currentColor" fillRule="evenodd" aria-hidden="true">
    <path d="M0 -10 L8.66 -5 L8.66 5 L0 10 L-8.66 5 L-8.66 -5 Z M0 -6.4 L5.54 -3.2 L5.54 3.2 L0 6.4 L-5.54 3.2 L-5.54 -3.2 Z M0 -2.8 L2.42 -1.4 L2.42 1.4 L0 2.8 L-2.42 1.4 L-2.42 -1.4 Z" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="1.5 1.5 21 20.5" height="1em" width="1.02em" fill="currentColor" fillRule="evenodd" aria-hidden="true">
    <path d="M12.001 2c-5.5 0-5 2.4-5 2.4l.1 2.5h5v.7H5.2c0 0-3.2.3-3.2 4.8 0 4.1 2.7 4.2 2.7 4.2h1.6v-2.3c0 0-.1-2.8 2.7-2.8h4.9s2.7-.1 2.7-2.7V4.4s.2-2.4-4.8-2.4zm-1.8 1.5c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.5.4-.9.9-.9z" />
    <path d="M17.201 8.8v2.3c0 0 .1 2.8-2.7 2.8H9.5s-2.7.1-2.7 2.7v4.1s-.2 2.4 4.8 2.4c5.5 0 5-2.4 5-2.4l-.1-2.5h-5v-.7h6.8c0 0 3.2-.3 3.2-4.8 0-4.1-2.7-4.2-2.7-4.2h-1.8zm-3.4 11.2c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9s.9.4.9.9c0 .5-.4.9-.9.9z" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 1 24 22" height="1em" width="1.09em" fill="currentColor" aria-hidden="true">
    <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zM11.261 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H5.816c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm2.722-2.722h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.722 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H5.816c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm8.166 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444-2.722h2.119c.102 0 .186-.083.186-.185V3.33c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zM23.99 12.528c-.015-.098-.03-.198-.052-.295-.218-1.127-1.127-1.921-2.196-1.921-.08 0-.16.006-.239.018-.89.136-1.637.755-1.932 1.573-.097.266-.145.548-.145.83v2.898c0 1.83-1.488 3.32-3.32 3.32H6.969c-1.398 0-2.531-1.134-2.531-2.532v-.125c.01-.225.105-.436.27-.585.162-.147.379-.222.597-.206h12.981c.218-.016.435.059.597.206.165.149.26.36.27.585v.125c0 2.274 1.848 4.122 4.122 4.122h.001c.224 0 .445-.02.662-.058 1.332-.234 2.37-1.272 2.604-2.604.038-.217.058-.438.058-.662l-.029-4.819z" />
  </svg>
);

const MongoLogo = () => (
  <svg viewBox="-126 -110 252 264" height="1em" width="1em" fill="currentColor" fillRule="evenodd" aria-hidden="true">
    <path d="M 0 -105 C -15 -80 -80 -20 -80 35 C -80 83 -36 112 -4 132 V 148 H 4 V 132 C 36 112 80 83 80 35 C 80 -20 15 -80 0 -105 Z M -2 -55 V 126 H 2 V -55 Z" />
  </svg>
);

const PostgresLogo = () => (
  <svg viewBox="-100 -80 200 205" height="1em" width="1em" fill="currentColor" fillRule="evenodd" aria-hidden="true">
    <path d="M -70 10 C -70 -60 50 -75 75 -20 C 85 5 80 45 60 70 C 45 88 15 90 0 90 C -20 90 -40 75 -55 55 C -65 40 -70 25 -70 10 Z M 29 -20 a 9 9 0 1 0 -18 0 a 9 9 0 1 0 18 0 Z" />
    <path opacity="0.72" d="M -75 5 C -90 -30 -60 -70 -25 -70 C -40 -40 -45 10 -75 5 Z" />
    <path opacity="0.9" d="M 60 40 C 75 55 90 80 85 100 C 80 115 65 115 55 105 C 45 95 55 75 45 60 Z" />
  </svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 24 23" height="1em" width="1.04em" fill="currentColor" aria-hidden="true">
    <path d="M12 1 L22 5.2 L12 9.4 L2 5.2 Z" />
    <path opacity="0.72" d="M2 6.0 L11.5 10.0 V12.3 L2 8.4 Z" />
    <path opacity="0.86" d="M22 6.0 L12.5 10.0 V12.3 L22 8.4 Z" />
    <path opacity="0.72" d="M2 10.6 L11.5 14.6 V16.9 L2 13.0 Z" />
    <path opacity="0.86" d="M22 10.6 L12.5 14.6 V16.9 L22 13.0 Z" />
    <path opacity="0.72" d="M2 15.2 L11.5 19.2 V21.5 L2 17.6 Z" />
    <path opacity="0.86" d="M22 15.2 L12.5 19.2 V21.5 L22 17.6 Z" />
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 3 24 18" height="1em" width="1.25em" fill="currentColor" aria-hidden="true">
    <path d="M12 4.8C8.8 4.8 6.8 6.4 6 9.6c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
  </svg>
);

const ExpressLogo = () => (
  <svg viewBox="0 0 24 24" height="1em" width="1em" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M5.4 12H10.6C10.6 9.8 9.4 8.6 7.9 8.6C6.2 8.6 5.2 9.9 5.2 12C5.2 14.2 6.3 15.4 8.1 15.4C9.2 15.4 10 15.0 10.4 14.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.4 8.9L17.2 15.1M17.2 8.9L12.4 15.1"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <circle cx="19.1" cy="14.9" r="1.05" fill="currentColor" />
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" height="1em" width="1em" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

function TechSwapCloud() {
  const [isLight, setIsLight] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const techLogos = useMemo(
    () => [
      {
        node: <ReactLogo />,
        title: "React.js",
        href: "https://react.dev",
        hoverColor: isLight ? "#0284c7" : "#61dafb",
      },
      {
        node: <NextLogo />,
        title: "Next.js",
        href: "https://nextjs.org",
      },
      {
        node: <TypeScriptLogo />,
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
        hoverColor: "#3178c6",
      },
      {
        node: <NodeLogo />,
        title: "Node.js",
        href: "https://nodejs.org",
        hoverColor: isLight ? "#16a34a" : "#22c55e",
      },
      {
        node: <PythonLogo />,
        title: "Python",
        href: "https://www.python.org",
        hoverColor: isLight ? "#2563eb" : "#3776ab",
      },
      {
        node: <DockerLogo />,
        title: "Docker",
        href: "https://www.docker.com",
        hoverColor: "#2496ed",
      },
      {
        node: <MongoLogo />,
        title: "MongoDB",
        href: "https://www.mongodb.com",
        hoverColor: isLight ? "#059669" : "#10b981",
      },
      {
        node: <PostgresLogo />,
        title: "PostgreSQL",
        href: "https://www.postgresql.org",
        hoverColor: isLight ? "#336791" : "#60a5fa",
      },
      {
        node: <RedisLogo />,
        title: "Redis",
        href: "https://redis.io",
        hoverColor: isLight ? "#dc2626" : "#ef4444",
      },
      {
        node: <TailwindLogo />,
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
        hoverColor: isLight ? "#0284c7" : "#38bdf8",
      },
      {
        node: <ExpressLogo />,
        title: "Express.js",
        href: "https://expressjs.com",
        hoverColor: isLight ? "#d97706" : "#f59e0b",
      },
      {
        node: <GitHubLogo />,
        title: "GitHub & Git",
        href: "https://github.com/pratikp23",
      },
    ],
    [isLight]
  );

  return (
    <div className="tech-swap-cloud w-full mt-4 py-5 sm:py-6 md:py-7 border-y border-white/[0.08] bg-[#08090c]/85 backdrop-blur-md overflow-hidden flex flex-col items-center">
      <div className="w-full relative">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={56}
          hoverSpeed={0}
          scaleOnHover
          layout="line"
          bend={0.5}
          magnify={0}
          labels="none"
          muted={0}
          focus={0}
          tiltX={0}
          tiltY={0}
          fadeOut
          fadeOutWidth={0.12}
          scrollBoost={0}
          step={false}
          draggable
          intro
          ariaLabel="Technology stack"
          className={isLight ? "text-slate-900" : "text-slate-200"}
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        />
      </div>
    </div>
  );
}

export default memo(TechSwapCloud);
