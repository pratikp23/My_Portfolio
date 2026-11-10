// Identity artwork drawn from each project's domain and architecture.
// If project.image is present, renders the screenshot image; otherwise renders original CSS/SVG art.

export default function ProjectArt({ project, id, hue }) {
  const projId = id || project?.slug || project?.id;
  const accentColor = hue || project?.accent || "#34d399";

  if (project?.image) {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <img
          src={project.image}
          alt={`${project.title || "Project"} screenshot`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  const frame = "w-full h-full rounded-2xl overflow-hidden relative";

  // HealthAI Guardian: ECG pulse waveform + AI vital telemetry
  if (projId === "healthai" || projId === "healthai-guardian") {
    return (
      <div className={frame} style={{ background: "linear-gradient(135deg, #021a14, #052e23 55%, #021a14)" }}>
        <div
          className="absolute inset-0 opacity-45"
          style={{ background: `radial-gradient(circle at 65% 25%, ${accentColor}33, transparent 65%)` }}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: accentColor }} />
              <span className="font-mono text-[10px] tracking-widest text-white/60">HEALTHAI · VITALS TELEMETRY</span>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
              NORMAL RHYTHM
            </span>
          </div>

          {/* Pulse ECG wave */}
          <div className="py-2">
            <svg viewBox="0 0 320 80" className="w-full h-16 stroke-current" style={{ color: accentColor }} fill="none">
              <path
                d="M 0 40 L 40 40 L 55 40 L 65 15 L 75 65 L 85 25 L 95 48 L 105 40 L 160 40 L 175 40 L 185 10 L 195 70 L 205 20 L 215 50 L 225 40 L 320 40"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div>
              <span className="block font-mono text-[9px] text-white/40">HEART RATE</span>
              <span className="font-mono text-xs font-bold text-white">72 BPM</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] text-white/40">SPO2</span>
              <span className="font-mono text-xs font-bold" style={{ color: accentColor }}>98.6%</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] text-white/40">STATUS</span>
              <span className="font-mono text-xs font-bold text-emerald-400">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // HAQ-DWAAR AI: 6-stage welfare pipeline + eligibility score
  if (projId === "haqdwaar" || projId === "haq-dwaar-ai") {
    return (
      <div className={frame} style={{ background: "linear-gradient(135deg, #04140e, #0a1f16 55%, #04140e)" }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(circle at 70% 20%, ${accentColor}33, transparent 60%)` }}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: accentColor }}></span>
            <span className="font-mono text-[10px] tracking-widest text-white/50">HAQ-DWAAR · PUBLIC WELFARE</span>
          </div>
          <div className="space-y-2">
            {["DISCOVER", "MATCH", "VERIFY", "PREPARE", "APPLY", "TRACK"].map((s, i, arr) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className="font-mono text-[9px] px-2 py-1 rounded border"
                  style={{ borderColor: accentColor + "55", color: accentColor }}
                >
                  {s}
                </span>
                {i < arr.length - 1 && <span className="w-4 h-px" style={{ background: accentColor + "44" }}></span>}
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between font-mono text-[9px] text-white/40 mb-1.5">
              <span>ELIGIBILITY SCORE</span>
              <span style={{ color: accentColor }}>82 / 100</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex">
              {[40, 30, 15, 10, 5].map((w, i) => (
                <span
                  key={i}
                  className="h-full"
                  style={{ width: `${w}%`, background: accentColor, opacity: 1 - i * 0.16 }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LearnAI: MERN course cards + progress tracker
  if (projId === "learnai") {
    return (
      <div className={frame} style={{ background: "linear-gradient(150deg, #100a24, #1a1238 60%, #0d081c)" }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(circle at 25% 15%, ${accentColor}33, transparent 55%)` }}
        />
        <div className="absolute inset-0 p-6 flex flex-col gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full" style={{ background: accentColor }}></span>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 flex flex-col justify-between">
                <div
                  className="h-8 rounded-lg"
                  style={{ background: `linear-gradient(120deg, ${accentColor}${i % 2 ? "22" : "33"}, transparent)` }}
                ></div>
                <div className="mt-2 h-1.5 w-3/4 rounded bg-white/15"></div>
                <div className="mt-1 h-1 w-1/2 rounded bg-white/10"></div>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <span className="block h-full w-2/3 rounded-full" style={{ background: accentColor }}></span>
          </div>
        </div>
      </div>
    );
  }

  // Knot AI: Multi-agent network mesh
  if (projId === "knotai" || projId === "knot-ai") {
    return (
      <div className={frame} style={{ background: "linear-gradient(150deg, #171002, #241a06 60%, #120c02)" }}>
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: `radial-gradient(circle at 50% 45%, ${accentColor}26, transparent 60%)` }}
        />
        <div className="absolute inset-0">
          <svg viewBox="0 0 300 190" className="w-full h-full">
            <g stroke={accentColor} strokeOpacity="0.35" strokeWidth="1">
              <line x1="150" y1="95" x2="70" y2="45" />
              <line x1="150" y1="95" x2="235" y2="40" />
              <line x1="150" y1="95" x2="60" y2="140" />
              <line x1="150" y1="95" x2="245" y2="145" />
              <line x1="70" y1="45" x2="235" y2="40" />
              <line x1="60" y1="140" x2="245" y2="145" />
            </g>
            {[
              [150, 95, 10],
              [70, 45, 6],
              [235, 40, 6],
              [60, 140, 6],
              [245, 145, 6],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={accentColor} fillOpacity={i === 0 ? 0.95 : 0.5} />
            ))}
          </svg>
        </div>
        <div className="absolute bottom-5 left-6 font-mono text-[10px] tracking-widest text-white/50">
          MULTI-AGENT MESH · REDIS SESSIONS
        </div>
      </div>
    );
  }

  // NexusChat / RayFlow: Team build + conversation message threads
  return (
    <div className={frame} style={{ background: "linear-gradient(150deg, #02131a, #062029 60%, #02141c)" }}>
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: `radial-gradient(circle at 80% 25%, ${accentColor}30, transparent 55%)` }}
      />
      <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2.5">
        {[
          ["w-2/3", true],
          ["w-1/2", false],
          ["w-3/5", true],
          ["w-1/3", false],
        ].map(([w, left], i) => (
          <div key={i} className={`flex ${left ? "" : "justify-end"}`}>
            <div
              className={`${w} h-7 rounded-2xl ${left ? "rounded-bl-sm" : "rounded-br-sm"} border flex items-center px-3`}
              style={{
                borderColor: left ? accentColor + "40" : "rgba(255,255,255,0.12)",
                background: left ? accentColor + "14" : "rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="h-1 w-2/3 rounded"
                style={{ background: left ? accentColor + "99" : "rgba(255,255,255,0.25)" }}
              ></span>
            </div>
          </div>
        ))}
        <div className="pt-2 font-mono text-[10px] tracking-widest text-white/50">TEAM BUILD · NEXT.JS + PRISMA</div>
      </div>
    </div>
  );
}
