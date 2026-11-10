import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, '..', 'public', 'tech');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function cardTemplate({ id, name, cat, col, glowCol, logoSvg }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
  <defs>
    <radialGradient id="cardGlow_${id}" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="${glowCol}" stop-opacity="0.32" />
      <stop offset="60%" stop-color="${glowCol}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#0c1017" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cardBg_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141a24" />
      <stop offset="50%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#080b0f" />
    </linearGradient>
    <linearGradient id="borderGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${col}" stop-opacity="0.45" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.12" />
      <stop offset="100%" stop-color="${col}" stop-opacity="0.25" />
    </linearGradient>
    <filter id="shadow_${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="${col}" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Card Background -->
  <rect x="10" y="10" width="580" height="730" rx="32" ry="32" fill="url(#cardBg_${id})" stroke="url(#borderGrad_${id})" stroke-width="2" />
  
  <!-- Ambient Radial Glow -->
  <circle cx="300" cy="270" r="230" fill="url(#cardGlow_${id})" />

  <!-- Corner Tech Accent Marks -->
  <path d="M 28 56 L 28 28 L 56 28" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" opacity="0.85" />
  <path d="M 572 56 L 572 28 L 544 28" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" opacity="0.85" />
  <path d="M 28 694 L 28 722 L 56 722" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" opacity="0.85" />
  <path d="M 572 694 L 572 722 L 544 722" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" opacity="0.85" />

  <!-- Center Logo Container -->
  <g filter="url(#shadow_${id})">
    ${logoSvg}
  </g>

  <!-- Tech Name -->
  <text x="300" y="490" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="42" font-weight="700" fill="#F8FAFC" letter-spacing="-0.5">
    ${name}
  </text>

  <!-- Category Pill Badge -->
  <g transform="translate(300, 555)">
    <rect x="-140" y="-22" width="280" height="44" rx="22" ry="22" fill="#0f172a" stroke="${col}" stroke-width="1.5" stroke-opacity="0.5" />
    <text x="0" y="6" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="${col}" letter-spacing="1.5">
      ${cat.toUpperCase()}
    </text>
  </g>

  <!-- Bottom Terminal Tag -->
  <text x="300" y="665" text-anchor="middle" font-family="'JetBrains Mono', 'Fira Code', Consolas, monospace" font-size="15" font-weight="500" fill="#64748B" letter-spacing="2">
    // CORE SYSTEM STACK
  </text>
</svg>`;
}

const CARDS = [
  // 1. React.js
  {
    id: 'react',
    name: 'React.js',
    cat: 'Frontend Architecture',
    col: '#61DAFB',
    glowCol: '#61DAFB',
    logoSvg: `
      <g stroke="#61DAFB" stroke-width="12" fill="none">
        <ellipse cx="300" cy="270" rx="118" ry="44" />
        <ellipse cx="300" cy="270" rx="118" ry="44" transform="rotate(60 300 270)" />
        <ellipse cx="300" cy="270" rx="118" ry="44" transform="rotate(120 300 270)" />
      </g>
      <circle cx="300" cy="270" r="22" fill="#61DAFB" />
    `
  },

  // 2. Next.js
  {
    id: 'nextjs',
    name: 'Next.js',
    cat: 'Full Stack Framework',
    col: '#FFFFFF',
    glowCol: '#FFFFFF',
    logoSvg: `
      <defs>
        <linearGradient id="nextSlash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="80%" stop-color="#FFFFFF" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="270" r="105" fill="#000000" stroke="#334155" stroke-width="4" />
      <g transform="translate(195, 165) scale(1.17)">
        <path d="M149.5 157.5L69.1 54H54v72h14v-53.7l70.8 91.4c3.8-1.8 7.4-3.9 10.7-6.2z" fill="url(#nextSlash)" />
        <rect x="115" y="54" width="14" height="72" fill="#FFFFFF" />
      </g>
    `
  },

  // 3. TypeScript
  {
    id: 'typescript',
    name: 'TypeScript',
    cat: 'Type-Safe Systems',
    col: '#3178C6',
    glowCol: '#3178C6',
    logoSvg: `
      <rect x="195" y="165" width="210" height="210" rx="28" fill="#3178C6" />
      <!-- Letter T -->
      <path d="M 230 226 H 290 V 244 H 269 V 328 H 251 V 244 H 230 Z" fill="#FFFFFF" />
      <!-- Letter S -->
      <path d="M 305 304 C 310 322 325 330 344 330 C 362 330 374 320 374 308 C 374 295 363 288 347 283 L 335 279 C 316 273 302 263 302 245 C 302 225 320 212 342 212 C 364 212 379 224 382 242 L 364 246 C 361 234 353 228 342 228 C 331 228 322 235 322 244 C 322 254 331 259 344 263 L 356 267 C 378 274 394 285 394 308 C 394 330 374 346 344 346 C 318 346 300 331 296 306 Z" fill="#FFFFFF" />
    `
  },

  // 4. Node.js
  {
    id: 'nodejs',
    name: 'Node.js',
    cat: 'Backend Runtime',
    col: '#22C55E',
    glowCol: '#22C55E',
    logoSvg: `
      <g transform="translate(300, 270) scale(10.5)">
        <path d="M0 -10 L8.66 -5 L8.66 5 L0 10 L-8.66 5 L-8.66 -5 Z" fill="#22C55E" />
        <path d="M0 -7 L6.06 -3.5 L6.06 3.5 L0 7 L-6.06 3.5 L-6.06 -3.5 Z" fill="#0D1117" />
        <path d="M-3 -4 L3 -4 L3 4 L-3 4 Z" fill="#22C55E" />
      </g>
    `
  },

  // 5. Python
  {
    id: 'python',
    name: 'Python',
    cat: 'AI & Data Engineering',
    col: '#38BDF8',
    glowCol: '#FACC15',
    logoSvg: `
      <g transform="translate(195, 165) scale(8.75)">
        <!-- Top Snake (Blue) -->
        <path fill="#38BDF8" d="M12.001 2c-5.5 0-5 2.4-5 2.4l.1 2.5h5v.7H5.2c0 0-3.2.3-3.2 4.8 0 4.1 2.7 4.2 2.7 4.2h1.6v-2.3c0 0-.1-2.8 2.7-2.8h4.9s2.7-.1 2.7-2.7V4.4s.2-2.4-4.8-2.4zm-1.8 1.5c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.5.4-.9.9-.9z" />
        <!-- Bottom Snake (Yellow) -->
        <path fill="#FACC15" d="M17.201 8.8v2.3c0 0 .1 2.8-2.7 2.8H9.5s-2.7.1-2.7 2.7v4.1s-.2 2.4 4.8 2.4c5.5 0 5-2.4 5-2.4l-.1-2.5h-5v-.7h6.8c0 0 3.2-.3 3.2-4.8 0-4.1-2.7-4.2-2.7-4.2h-1.8zm-3.4 11.2c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9s.9.4.9.9c0 .5-.4.9-.9.9z" />
      </g>
    `
  },

  // 6. Docker
  {
    id: 'docker',
    name: 'Docker',
    cat: 'Containers & DevOps',
    col: '#38BDF8',
    glowCol: '#38BDF8',
    logoSvg: `
      <g transform="translate(180, 165) scale(10)">
        <path fill="#38BDF8" d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zM11.261 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H5.816c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm2.722-2.722h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.722 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H5.816c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm8.166 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444-2.722h2.119c.102 0 .186-.083.186-.185V3.33c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185z M23.99 12.528c-.015-.098-.03-.198-.052-.295c-.218-1.127-1.127-1.921-2.196-1.921c-.08 0-.16.006-.239.018c-.89.136-1.637.755-1.932 1.573c-.097.266-.145.548-.145.83v2.898c0 1.83-1.488 3.32-3.32 3.32H6.969c-1.398 0-2.531-1.134-2.531-2.532v-.125c.01-.225.105-.436.27-.585c.162-.147.379-.222.597-.206h12.981c.218-.016.435.059.597.206c.165.149.26.36.27.585v.125c0 2.274 1.848 4.122 4.122 4.122h.001c.224 0 .445-.02.662-.058c1.332-.234 2.37-1.272 2.604-2.604c.038-.217.058-.438.058-.662l-.029-4.819z" />
      </g>
    `
  },

  // 7. MongoDB
  {
    id: 'mongodb',
    name: 'MongoDB',
    cat: 'NoSQL Document Store',
    col: '#10B981',
    glowCol: '#10B981',
    logoSvg: `
      <defs>
        <linearGradient id="mongoLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10B981" />
          <stop offset="100%" stop-color="#047857" />
        </linearGradient>
        <linearGradient id="mongoRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34D399" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
      </defs>
      <g transform="translate(300, 260) scale(1.15)">
        <!-- Left Leaf Half -->
        <path d="M 0 -105 C -15 -80 -80 -20 -80 35 C -80 85 -35 115 0 135 Z" fill="url(#mongoLeft)" />
        <!-- Right Leaf Half -->
        <path d="M 0 -105 C 15 -80 80 -20 80 35 C 80 85 35 115 0 135 Z" fill="url(#mongoRight)" />
        <!-- Stem & Vein -->
        <path d="M 0 -105 L 0 142" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.3" stroke-linecap="round" />
      </g>
    `
  },

  // 8. PostgreSQL
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    cat: 'Relational Database',
    col: '#38BDF8',
    glowCol: '#336791',
    logoSvg: `
      <g transform="translate(300, 260) scale(1.2)">
        <!-- Elephant Head Silhouette / Slonik -->
        <path d="M -70 10 C -70 -60 50 -75 75 -20 C 85 5 80 45 60 70 C 45 88 15 90 0 90 C -20 90 -40 75 -55 55 C -65 40 -70 25 -70 10 Z" fill="#336791" />
        <!-- Elephant Ear -->
        <path d="M -75 5 C -90 -30 -60 -70 -25 -70 C -40 -40 -45 10 -75 5 Z" fill="#29557a" />
        <!-- Trunk -->
        <path d="M 60 40 C 75 55 90 80 85 100 C 80 115 65 115 55 105 C 45 95 55 75 45 60 Z" fill="#336791" />
        <!-- Eye -->
        <circle cx="20" cy="-20" r="8" fill="#FFFFFF" />
        <circle cx="22" cy="-20" r="4" fill="#0D1117" />
        <!-- Tusk -->
        <path d="M 35 55 C 45 65 60 65 65 50 C 50 48 40 45 35 55 Z" fill="#FFFFFF" />
      </g>
    `
  },

  // 9. Redis
  {
    id: 'redis',
    name: 'Redis',
    cat: 'In-Memory Cache & Queue',
    col: '#EF4444',
    glowCol: '#EF4444',
    logoSvg: `
      <g transform="translate(300, 260) scale(1.1)">
        <!-- Bottom Layer -->
        <path d="M 0 50 L 95 0 L 0 -50 L -95 0 Z" fill="#991B1B" />
        <path d="M -95 0 L 0 50 L 0 75 L -95 25 Z" fill="#7F1D1D" />
        <path d="M 0 50 L 95 0 L 95 25 L 0 75 Z" fill="#B91C1C" />

        <!-- Middle Layer -->
        <g transform="translate(0, -35)">
          <path d="M 0 50 L 95 0 L 0 -50 L -95 0 Z" fill="#DC2626" />
          <path d="M -95 0 L 0 50 L 0 70 L -95 20 Z" fill="#991B1B" />
          <path d="M 0 50 L 95 0 L 95 20 L 0 70 Z" fill="#EF4444" />
        </g>

        <!-- Top Layer -->
        <g transform="translate(0, -70)">
          <path d="M 0 50 L 95 0 L 0 -50 L -95 0 Z" fill="#EF4444" />
          <path d="M -95 0 L 0 50 L 0 68 L -95 18 Z" fill="#B91C1C" />
          <path d="M 0 50 L 95 0 L 95 18 L 0 68 Z" fill="#F87171" />
        </g>
      </g>
    `
  },

  // 10. Tailwind CSS
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    cat: 'Modern Design Systems',
    col: '#38BDF8',
    glowCol: '#38BDF8',
    logoSvg: `
      <g transform="translate(190, 160) scale(9.2)">
        <path fill="#38BDF8" d="M12 4.8C8.8 4.8 6.8 6.4 6 9.6c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
      </g>
    `
  },

  // 11. Express.js
  {
    id: 'express',
    name: 'Express.js',
    cat: 'RESTful API Services',
    col: '#F59E0B',
    glowCol: '#F59E0B',
    logoSvg: `
      <g transform="translate(300, 270)">
        <rect x="-105" y="-105" width="210" height="210" rx="36" fill="#18181B" stroke="#F59E0B" stroke-width="3" stroke-opacity="0.6" />
        <text x="-15" y="25" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="92" font-weight="900" fill="#F8FAFC" letter-spacing="-4">
          ex
        </text>
        <circle cx="48" cy="18" r="12" fill="#F59E0B" />
      </g>
    `
  },

  // 12. GitHub & Git
  {
    id: 'github',
    name: 'GitHub & Git',
    cat: 'CI/CD & Version Control',
    col: '#F8FAFC',
    glowCol: '#F8FAFC',
    logoSvg: `
      <g transform="translate(190, 160) scale(9.2)">
        <path fill="#F8FAFC" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </g>
    `
  }
];

CARDS.forEach(card => {
  const svgContent = cardTemplate(card);
  const filePath = path.join(outDir, `${card.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  console.log(`Generated SVG: ${filePath}`);
});

console.log('All 12 authentic tech SVG cards generated successfully!');
