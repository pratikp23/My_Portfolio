import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Sparkles, Zap, Compass, Info, Hand } from 'lucide-react';

const SKILLS_DATA = [
  { id: 'react', name: 'React.js', category: 'frontend', color: '#0284c7', darkColor: '#61dafb', tag: 'Core UI', desc: 'Component architecture, Hooks, custom state' },
  { id: 'js', name: 'JavaScript', category: 'frontend', color: '#ca8a04', darkColor: '#f7df1e', tag: 'ES6+', desc: 'Modern async/await, closures, prototypes' },
  { id: 'next', name: 'Next.js', category: 'frontend', color: '#0f172a', darkColor: '#e2e8f0', tag: 'SSR / SSG', desc: 'App router, server rendering, SEO' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '#0284c7', darkColor: '#38bdf8', tag: 'Styling', desc: 'Utility-first modern responsive UI' },
  { id: 'node', name: 'Node.js', category: 'backend', color: '#16a34a', darkColor: '#4ade80', tag: 'Runtime', desc: 'Event loop, microservices, asynchronous I/O' },
  { id: 'express', name: 'Express.js', category: 'backend', color: '#d97706', darkColor: '#fbbf24', tag: 'REST API', desc: 'Routing, middleware pipelines, controllers' },
  { id: 'mongo', name: 'MongoDB', category: 'database', color: '#059669', darkColor: '#10b981', tag: 'NoSQL', desc: 'Document modeling, indexing, aggregation' },
  { id: 'sql', name: 'SQL', category: 'database', color: '#0284c7', darkColor: '#38bdf8', tag: 'Relational', desc: 'Schema normalization, complex joins, indexing' },
  { id: 'python', name: 'Python', category: 'data', color: '#2563eb', darkColor: '#60a5fa', tag: 'Data & Scripting', desc: 'Automation, data parsing, algorithms' },
  { id: 'git', name: 'Git', category: 'tools', color: '#ea580c', darkColor: '#f97316', tag: 'VCS', desc: 'Branching, PRs, version control workflows' },
  { id: 'docker', name: 'Docker', category: 'tools', color: '#0284c7', darkColor: '#38bdf8', tag: 'Containers', desc: 'Containerization, reproducible deployment' },
  { id: 'rest', name: 'REST APIs', category: 'backend', color: '#e11d48', darkColor: '#f43f5e', tag: 'Architecture', desc: 'Stateless endpoints, HTTP verbs, status codes' },
  { id: 'redis', name: 'Redis', category: 'database', color: '#dc2626', darkColor: '#ef4444', tag: 'Caching', desc: 'In-memory key-value caching & rate limiting' },
  { id: 'jwt', name: 'JWT Auth', category: 'backend', color: '#e11d48', darkColor: '#fb7185', tag: 'Security', desc: 'Token authorization & secure cookie handling' },
  { id: 'github', name: 'GitHub', category: 'tools', color: '#7c3aed', darkColor: '#c084fc', tag: 'CI/CD & Repo', desc: 'Code review, actions, collaboration' },
  { id: 'postman', name: 'Postman', category: 'tools', color: '#ea580c', darkColor: '#fb923c', tag: 'API Testing', desc: 'Contract testing, collection runs, mocks' },
  { id: 'pandas', name: 'Pandas', category: 'data', color: '#4f46e5', darkColor: '#818cf8', tag: 'Analytics', desc: 'DataFrame transformations, exploratory analysis' },
  { id: 'cpp', name: 'C / C++', category: 'core', color: '#7c3aed', darkColor: '#a78bfa', tag: 'DSA & Systems', desc: 'Data structures, pointers, memory model' },
  { id: 'firebase', name: 'Firebase', category: 'tools', color: '#d97706', darkColor: '#f59e0b', tag: 'Cloud DB', desc: 'Auth, Firestore, real-time synchronization' },
  { id: 'html5', name: 'HTML5', category: 'frontend', color: '#c2410c', darkColor: '#ea580c', tag: 'Semantic Web', desc: 'Accessible markups, semantics, canvas' },
  { id: 'css3', name: 'CSS3', category: 'frontend', color: '#1d4ed8', darkColor: '#2563eb', tag: 'Modern Styling', desc: 'Flexbox, CSS Grid, keyframe animations' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Arsenal' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Databases' },
  { id: 'tools', label: 'Toolchain' },
  { id: 'data', label: 'Data & Python' }
];

export default function PhysicsSkillSandbox() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesMapRef = useRef(new Map());
  const hoveredBodyRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Live theme tracking
  const [theme, setTheme] = useState(() => {
    return typeof document !== 'undefined' && document.documentElement.classList.contains('light')
      ? 'light'
      : 'dark';
  });
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Observer for theme changes on html tag
  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_DATA[0]);
  const selectedSkillRef = useRef(selectedSkill);
  useEffect(() => {
    selectedSkillRef.current = selectedSkill;
  }, [selectedSkill]);
  const [isZeroG, setIsZeroG] = useState(false);
  const [inView, setInView] = useState(true);

  // Intersection observer to pause physics loop when not visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Robust resolution across ESM/CJS module interops in Vite
    const M = (Matter && Matter.Engine) ? Matter : ((Matter && Matter.default) ? Matter.default : (typeof window !== 'undefined' && window.Matter ? window.Matter : Matter));
    const Engine = M?.Engine;
    const World = M?.World;
    const Bodies = M?.Bodies;
    const Mouse = M?.Mouse;
    const MouseConstraint = M?.MouseConstraint;
    const Runner = M?.Runner;
    const Body = M?.Body;
    const Events = M?.Events;
    const Bounds = M?.Bounds;
    const Vertices = M?.Vertices;

    if (!Engine || !World || !Bodies || !Runner) {
      console.warn('Matter.js engine failed to initialize');
      return;
    }

    const engine = Engine.create({
      gravity: { x: 0, y: isZeroG ? 0 : 0.85, scale: 0.001 }
    });
    engineRef.current = engine;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = container.clientWidth;
    let height = Math.min(Math.max(window.innerHeight * 0.55, 420), 520);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Arena Boundaries
    const wallThickness = 120;
    // Ground placed right at container bottom
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2.5, wallThickness, {
      isStatic: true,
      friction: 0.4,
      restitution: 0.4
    });
    // Left & Right walls
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 4, {
      isStatic: true,
      friction: 0.2,
      restitution: 0.4
    });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 4, {
      isStatic: true,
      friction: 0.2,
      restitution: 0.4
    });
    // Open high ceiling so spawned pills can NEVER be trapped
    const ceiling = Bodies.rectangle(width / 2, -1200, width * 3, wallThickness, {
      isStatic: true
    });

    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Pill Creation
    const filteredSkills = activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

    bodiesMapRef.current.clear();

    const cols = Math.max(3, Math.min(6, Math.floor(width / 130)));
    const colWidth = width / cols;

    const pillBodies = filteredSkills.map((skill, index) => {
      const textWidth = skill.name.length * 9.5;
      const pillWidth = Math.max(textWidth + 48, 106);
      const pillHeight = 40;

      // Clean grid spawn: staggered columns inside the top entrance
      const col = index % cols;
      const row = Math.floor(index / cols);
      const spawnX = Math.max(60, Math.min(width - 60, colWidth * col + colWidth / 2 + (Math.random() - 0.5) * 20));
      // Start just above the canvas top so they cascade down naturally
      const spawnY = -25 - row * 52;

      const body = Bodies.rectangle(spawnX, spawnY, pillWidth, pillHeight, {
        chamfer: { radius: pillHeight / 2 },
        restitution: 0.65,
        friction: 0.15,
        frictionAir: 0.02,
        density: 0.002,
        angle: (Math.random() - 0.5) * 0.35
      });

      body.skillData = { ...skill, width: pillWidth, height: pillHeight };
      bodiesMapRef.current.set(body.id, body);
      return body;
    });

    World.add(engine.world, pillBodies);

    // Mouse and Touch constraint
    const mouse = Mouse.create(canvas);
    mouse.pixelRatio = dpr;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.22,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);

    let dragStartPos = null;

    Events.on(mouseConstraint, 'startdrag', (evt) => {
      isDraggingRef.current = true;
      dragStartPos = { x: evt.mouse.position.x, y: evt.mouse.position.y };
      if (evt.body && evt.body.skillData) {
        setSelectedSkill(evt.body.skillData);
      }
    });

    Events.on(mouseConstraint, 'enddrag', (evt) => {
      isDraggingRef.current = false;
      if (dragStartPos && evt.body && evt.body.skillData) {
        const dx = evt.mouse.position.x - dragStartPos.x;
        const dy = evt.mouse.position.y - dragStartPos.y;
        if (Math.hypot(dx, dy) < 8) {
          setSelectedSkill(evt.body.skillData);
        }
      }
    });

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 60FPS Theme-Aware Canvas Render Loop
    const render = () => {
      if (!ctx) return;
      const isLight = themeRef.current === 'light';

      // 1. PERFECT CANVAS CLEARANCE (Clean every pixel regardless of transforms)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.save();
      ctx.scale(dpr, dpr);

      // Check mouse hover
      const mousePos = mouse.position;
      let currentHovered = null;
      if (!isDraggingRef.current) {
        for (const body of pillBodies) {
          if (Bounds.contains(body.bounds, mousePos)) {
            if (Vertices.contains(body.vertices, mousePos)) {
              currentHovered = body;
              break;
            }
          }
        }
      }
      hoveredBodyRef.current = currentHovered;
      canvas.style.cursor = currentHovered || isDraggingRef.current ? 'grab' : 'default';
      if (isDraggingRef.current) canvas.style.cursor = 'grabbing';

      // Safety check: keep any errant pill within arena boundaries
      pillBodies.forEach((body) => {
        if (body.position.y > height + 50) {
          Body.setPosition(body, { x: width / 2, y: 100 });
          Body.setVelocity(body, { x: 0, y: 0 });
        }
        if (body.position.x < -40 || body.position.x > width + 40) {
          Body.setPosition(body, { x: width / 2, y: 80 });
          Body.setVelocity(body, { x: 0, y: 0 });
        }
      });

      // Render Each Pill
      pillBodies.forEach((body) => {
        const { position, angle, skillData } = body;
        const { width: pWidth, height: pHeight, name, color, darkColor } = skillData;
        const activeColor = isLight ? color : darkColor;
        const isHovered = hoveredBodyRef.current === body;
        const isSelected = selectedSkillRef.current?.id === skillData.id;

        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        const r = pHeight / 2;
        const x = -pWidth / 2;
        const y = -pHeight / 2;

        // Draw pill rounded path
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + pWidth - r, y);
        ctx.arc(x + pWidth - r, y + r, r, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(x + r, y + pHeight);
        ctx.arc(x + r, y + r, r, Math.PI / 2, -Math.PI / 2);
        ctx.closePath();

        // Theme-Aware Glow and Drop Shadows
        if (isLight) {
          if (isSelected) {
            ctx.shadowColor = activeColor;
            ctx.shadowBlur = 16;
          } else if (isHovered) {
            ctx.shadowColor = 'rgba(15, 23, 42, 0.16)';
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
            ctx.shadowBlur = 5;
          }
        } else {
          if (isSelected) {
            ctx.shadowColor = activeColor;
            ctx.shadowBlur = 22;
          } else if (isHovered) {
            ctx.shadowColor = activeColor;
            ctx.shadowBlur = 14;
          } else {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
            ctx.shadowBlur = 6;
          }
        }

        // Theme-Aware Pill Background
        const grad = ctx.createLinearGradient(x, y, x, y + pHeight);
        if (isLight) {
          if (isSelected) {
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(1, '#f1f5f9');
          } else if (isHovered) {
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(1, '#f8fafc');
          } else {
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(1, '#f8fafc');
          }
        } else {
          if (isSelected) {
            grad.addColorStop(0, 'rgba(28, 34, 48, 0.98)');
            grad.addColorStop(1, 'rgba(16, 20, 30, 0.98)');
          } else if (isHovered) {
            grad.addColorStop(0, 'rgba(26, 31, 44, 0.95)');
            grad.addColorStop(1, 'rgba(16, 20, 30, 0.95)');
          } else {
            grad.addColorStop(0, 'rgba(18, 22, 31, 0.92)');
            grad.addColorStop(1, 'rgba(11, 14, 21, 0.92)');
          }
        }
        ctx.fillStyle = grad;
        ctx.fill();

        // Theme-Aware Pill Borders
        if (isLight) {
          ctx.lineWidth = isSelected ? 2 : (isHovered ? 1.5 : 1);
          ctx.strokeStyle = isSelected
            ? activeColor
            : (isHovered ? activeColor : 'rgba(15, 23, 42, 0.15)');
        } else {
          ctx.lineWidth = isSelected ? 2 : (isHovered ? 1.5 : 1);
          ctx.strokeStyle = isSelected
            ? activeColor
            : (isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.12)');
        }
        ctx.stroke();

        // Reset shadow for crisp text
        ctx.shadowBlur = 0;

        // Colored indicator circle
        ctx.beginPath();
        ctx.arc(x + 16, 0, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.fill();

        // Pill Typography
        if (isLight) {
          ctx.fillStyle = isSelected ? '#0f172a' : (isHovered ? '#0f172a' : '#1e293b');
        } else {
          ctx.fillStyle = isSelected ? '#ffffff' : (isHovered ? '#f1f5f9' : '#cbd5e1');
        }
        ctx.font = '600 13px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, x + 27, 0.5);

        ctx.restore();
      });

      ctx.restore();

      if (inView) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    // Resize handling
    const handleResize = () => {
      if (!container || !canvas) return;
      const newWidth = container.clientWidth;
      const newHeight = Math.min(Math.max(window.innerHeight * 0.55, 420), 520);

      width = newWidth;
      height = newHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      mouse.pixelRatio = dpr;

      Body.setPosition(ground, { x: width / 2, y: height + wallThickness / 2 });
      Body.setPosition(rightWall, { x: width + wallThickness / 2, y: height / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [activeCategory, isZeroG, inView]);

  // Actions
  const handleShake = () => {
    if (!engineRef.current) return;
    const M = (Matter && Matter.Engine) ? Matter : ((Matter && Matter.default) ? Matter.default : (typeof window !== 'undefined' && window.Matter ? window.Matter : Matter));
    const Body = M?.Body;
    if (!Body) return;

    const bodies = Array.from(bodiesMapRef.current.values());
    bodies.forEach((body) => {
      const forceMagnitude = 0.045 * body.mass;
      const angle = (Math.random() - 0.5) * Math.PI * 1.5;
      Body.applyForce(body, body.position, {
        x: Math.sin(angle) * forceMagnitude * (Math.random() > 0.5 ? 1 : -1),
        y: -Math.abs(Math.cos(angle) * forceMagnitude * 1.6)
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
    });
  };

  const handleResetGravity = () => {
    setIsZeroG((prev) => !prev);
  };

  const isLight = theme === 'light';

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden mb-10 transition-colors duration-200 border ${
        isLight
          ? 'bg-white border-slate-200 shadow-[0_10px_35px_rgba(15,23,42,0.06)]'
          : 'bg-[#090b10] border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Ambient background glows */}
      <div
        className={`absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-opacity ${
          isLight ? 'bg-amber-500/[0.08] opacity-70' : 'bg-amber-500/[0.05]'
        }`}
      />
      <div
        className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-opacity ${
          isLight ? 'bg-emerald-500/[0.06] opacity-60' : 'bg-cyan-500/[0.04]'
        }`}
      />

      {/* Top Header & Playground Toolbar */}
      <div
        className={`relative z-10 px-5 sm:px-8 pt-6 pb-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
          isLight ? 'bg-slate-50/70 border-slate-200/90' : 'border-white/[0.07]'
        }`}
      >
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 border ${
              isLight
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}
          >
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>Cuberto-Inspired Interactive Physics Lab</span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Grab, Drag & Play with the Stack
            <span
              className={`hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-lg font-mono font-normal border ${
                isLight
                  ? 'bg-slate-200/80 text-slate-700 border-slate-300'
                  : 'bg-white/[0.06] text-slate-400 border-white/[0.08]'
              }`}
            >
              Matter.js 2D Physics
            </span>
          </h3>
          <p
            className={`text-xs sm:text-sm mt-0.5 flex items-center gap-1.5 ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <Hand
              size={14}
              className={`flex-shrink-0 animate-bounce ${isLight ? 'text-amber-600' : 'text-amber-400'}`}
            />
            Pick up any pill with your mouse or finger, toss it across walls, or click to inspect.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Shake / Explode */}
          <button
            onClick={handleShake}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/[0.1]'
            }`}
            title="Toss all badges into the air"
          >
            <Zap size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
            <span>Toss Arena</span>
          </button>

          {/* Zero-G Toggle */}
          <button
            onClick={handleResetGravity}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
              isZeroG
                ? isLight
                  ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/[0.1]'
            }`}
            title="Toggle zero gravity"
          >
            <Compass
              size={14}
              className={
                isZeroG
                  ? isLight
                    ? 'animate-spin text-amber-700'
                    : 'animate-spin text-amber-400'
                  : isLight
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }
            />
            <span>{isZeroG ? 'Zero-G: Active' : 'Zero-G Mode'}</span>
          </button>
        </div>
      </div>

      {/* Domain Filters Row */}
      <div
        className={`relative z-10 px-5 sm:px-8 py-3 border-b flex items-center justify-between gap-3 overflow-x-auto no-scrollbar transition-colors ${
          isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#0d1017]/60 border-white/[0.04]'
        }`}
      >
        <div className="flex items-center gap-1.5 flex-nowrap">
          <span
            className={`text-[11px] font-mono uppercase tracking-wider mr-1 hidden sm:inline ${
              isLight ? 'text-slate-600' : 'text-slate-500'
            }`}
          >
            Spawn Domain:
          </span>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? isLight
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_8px_rgba(217,119,6,0.3)]'
                      : 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/80'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          className={`text-[11px] font-mono hidden md:block ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          Rigid Body Restitution: 0.65 (Bouncy)
        </div>
      </div>

      {/* Physics Canvas Arena */}
      <div
        className={`relative w-full h-[430px] sm:h-[480px] select-none overflow-hidden transition-colors ${
          isLight
            ? 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]'
            : 'bg-gradient-to-b from-[#090b10] via-[#0b0e14] to-[#07080c]'
        }`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none z-10"
        />

        {/* Selected Skill HUD Overlay at Bottom-Left */}
        {selectedSkill && (
          <div
            className={`absolute bottom-4 left-4 sm:left-6 z-20 max-w-[320px] sm:max-w-sm p-3.5 sm:p-4 rounded-2xl backdrop-blur-xl border shadow-xl pointer-events-none transition-all ${
              isLight
                ? 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.12)]'
                : 'bg-[#0e121a]/90 border-white/[0.1] text-white shadow-2xl'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 animate-ping"
                style={{ backgroundColor: isLight ? selectedSkill.color : selectedSkill.darkColor }}
              />
              <span
                className={`font-bold text-sm tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {selectedSkill.name}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-white/[0.06] text-amber-400 border-white/[0.08]'
                }`}
              >
                {selectedSkill.tag}
              </span>
            </div>
            <p
              className={`text-xs leading-snug ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {selectedSkill.desc}
            </p>
          </div>
        )}

        {/* Hint Pill Overlay at Top-Right */}
        <div
          className={`absolute top-3 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border backdrop-blur-md ${
            isLight
              ? 'bg-white/80 border-slate-200 text-slate-600'
              : 'bg-black/40 border-white/[0.06] text-slate-400'
          }`}
        >
          <Info size={12} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
          Click or fling any badge with cursor
        </div>
      </div>
    </div>
  );
}
