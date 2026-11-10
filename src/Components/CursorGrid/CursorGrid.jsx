import { useEffect, useRef, useCallback } from 'react';

const CursorGrid = ({
  cellSize = 54,
  color = '#f59e0b',
  gridColor = '#94a3b8',
  gridOpacity = 0.16,
  fillOpacity = 0.22,
  spotlight = 0.85,
  radius = 200,
  lineWidth = 1,
  clickPulse = true,
  ambient = 0.02,
  holdTime = 300,
  fadeDuration = 700,
  className = '',
  style = {},
  children,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const isRunningRef = useRef(false);

  // Mutable state for the animation loop
  const stateRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
    mouseX: -999,
    mouseY: -999,
    targetMouseX: -999,
    targetMouseY: -999,
    isInside: false,
    cells: new Map(), // key -> { col, row, intensity, time }
    pulses: [], // array of { x, y, r, maxR, alpha, speed }
    lastTime: 0,
  });

  const wake = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    stateRef.current.lastTime = performance.now();

    const loop = (now) => {
      const state = stateRef.current;
      const canvas = canvasRef.current;
      if (!canvas) {
        isRunningRef.current = false;
        return;
      }

      const dt = Math.min((now - state.lastTime) / 1000, 0.1) || 0.016;
      state.lastTime = now;

      // Smooth mouse follow
      state.mouseX += (state.targetMouseX - state.mouseX) * Math.min(1, dt * 15);
      state.mouseY += (state.targetMouseY - state.mouseY) * Math.min(1, dt * 15);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        isRunningRef.current = false;
        return;
      }

      const w = state.width;
      const h = state.height;

      // 1. CLEAR FRAMEBUFFER - 100% TRANSPARENT
      ctx.clearRect(0, 0, w, h);

      if (w <= 0 || h <= 0) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;
      const offX = Math.round((w - (cols - 1) * cellSize) / 2);
      const offY = Math.round((h - (rows - 1) * cellSize) / 2);

      // 2. AMBIENT CELL SPAWNS (Subtle random twinkle)
      if (ambient > 0 && Math.random() < ambient * dt * 60) {
        const randCol = Math.floor(Math.random() * cols);
        const randRow = Math.floor(Math.random() * rows);
        const key = `${randCol},${randRow}`;
        if (!state.cells.has(key)) {
          state.cells.set(key, {
            col: randCol,
            row: randRow,
            intensity: 0.35 + Math.random() * 0.45,
            age: 0,
          });
        }
      }

      // 3. DRAW BASE GRID LINES
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = gridOpacity;

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        const x = offX + c * cellSize;
        if (x >= 0 && x <= w) {
          ctx.moveTo(x + 0.5, 0);
          ctx.lineTo(x + 0.5, h);
        }
      }
      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        const y = offY + r * cellSize;
        if (y >= 0 && y <= h) {
          ctx.moveTo(0, y + 0.5);
          ctx.lineTo(w, y + 0.5);
        }
      }
      ctx.stroke();
      ctx.restore();

      // 4. DRAW ACTIVE / ENERGIZED CELLS
      if (state.cells.size > 0) {
        ctx.save();
        ctx.fillStyle = color;
        const fadeStep = dt / (fadeDuration / 1000);
        const holdSec = holdTime / 1000;

        for (const [key, cell] of state.cells.entries()) {
          cell.age += dt;
          if (cell.age > holdSec) {
            cell.intensity -= fadeStep;
          }

          if (cell.intensity <= 0.01) {
            state.cells.delete(key);
            continue;
          }

          const cellX = offX + cell.col * cellSize;
          const cellY = offY + cell.row * cellSize;

          ctx.globalAlpha = Math.min(1, fillOpacity * cell.intensity);
          ctx.fillRect(cellX + 1, cellY + 1, cellSize - 1, cellSize - 1);
        }
        ctx.restore();
      }

      // 5. DRAW SPOTLIGHT GLOW ON THE GRID
      if (state.isInside && spotlight > 0 && state.mouseX >= -radius && state.mouseX <= w + radius) {
        ctx.save();
        const radGrad = ctx.createRadialGradient(
          state.mouseX,
          state.mouseY,
          0,
          state.mouseX,
          state.mouseY,
          radius
        );
        radGrad.addColorStop(0, color);
        radGrad.addColorStop(0.5, color);
        radGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrad;
        ctx.globalAlpha = spotlight * 0.16;
        ctx.fillRect(state.mouseX - radius, state.mouseY - radius, radius * 2, radius * 2);
        ctx.restore();
      }

      // 6. DRAW CLICK PULSES (Ripples)
      if (state.pulses.length > 0) {
        ctx.save();
        ctx.lineWidth = lineWidth * 2;
        ctx.strokeStyle = color;

        for (let i = state.pulses.length - 1; i >= 0; i--) {
          const p = state.pulses[i];
          p.r += p.speed * dt;
          p.alpha = Math.max(0, 1 - p.r / p.maxR);

          if (p.alpha <= 0.01 || p.r >= p.maxR) {
            state.pulses.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = p.alpha * 0.45;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Check if we should keep animating or sleep
      const shouldContinue =
        state.isInside ||
        state.cells.size > 0 ||
        state.pulses.length > 0 ||
        ambient > 0;

      if (shouldContinue && !document.hidden) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        isRunningRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [cellSize, color, gridColor, gridOpacity, fillOpacity, spotlight, radius, lineWidth, ambient, holdTime, fadeDuration]);

  // Window resize & canvas setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width) || container.clientWidth || window.innerWidth);
      const h = Math.max(1, Math.round(rect.height) || container.clientHeight || window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      stateRef.current.width = w;
      stateRef.current.height = h;
      stateRef.current.dpr = dpr;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
        ctx.scale(dpr, dpr);
      }

      wake();
    };

    handleResize();

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const onVisibilityChange = () => {
      if (!document.hidden) wake();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(rafRef.current);
      isRunningRef.current = false;
    };
  }, [wake]);

  // Pointer interactions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const energize = (x, y) => {
      const state = stateRef.current;
      const w = state.width;
      const h = state.height;
      if (w <= 0 || h <= 0) return;

      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;
      const offX = Math.round((w - (cols - 1) * cellSize) / 2);
      const offY = Math.round((h - (rows - 1) * cellSize) / 2);

      const col = Math.floor((x - offX) / cellSize);
      const row = Math.floor((y - offY) / cellSize);

      // Energize the center cell and adjacent radius
      const reach = Math.max(1, Math.floor(radius / (cellSize * 1.6)));
      for (let dr = -reach; dr <= reach; dr++) {
        for (let dc = -reach; dc <= reach; dc++) {
          const c = col + dc;
          const r = row + dr;
          if (c >= 0 && c < cols && r >= 0 && r < rows) {
            const cx = offX + c * cellSize + cellSize / 2;
            const cy = offY + r * cellSize + cellSize / 2;
            const dist = Math.hypot(cx - x, cy - y);
            if (dist <= radius) {
              const strength = Math.pow(1 - dist / radius, 1.4);
              const key = `${c},${r}`;
              const existing = state.cells.get(key);
              if (!existing || strength > existing.intensity) {
                state.cells.set(key, { col: c, row: r, intensity: strength, age: 0 });
              }
            }
          }
        }
      }
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isInside = x >= -30 && y >= -30 && x <= rect.width + 30 && y <= rect.height + 30;

      const state = stateRef.current;
      state.isInside = isInside;
      state.targetMouseX = x;
      state.targetMouseY = y;

      if (isInside) {
        energize(x, y);
      }
      wake();
    };

    const onPointerDown = (e) => {
      if (!clickPulse) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

      if (isInside) {
        stateRef.current.pulses.push({
          x,
          y,
          r: 0,
          maxR: Math.hypot(rect.width, rect.height) * 0.7,
          alpha: 1,
          speed: 650,
        });
        wake();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [cellSize, radius, clickPulse, wake]);

  return (
    <div
      ref={containerRef}
      className={['overflow-hidden pointer-events-none', className].filter(Boolean).join(' ')}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        aria-hidden="true"
      />
      {children ? <div className="relative h-full w-full">{children}</div> : null}
    </div>
  );
};

export default CursorGrid;
