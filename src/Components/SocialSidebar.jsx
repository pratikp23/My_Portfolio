import { useState, useRef } from "react";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./Icons";
import { SOCIAL_LINKS } from "../config";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

function SocialDockIcon({ mouseY, social, isReduced }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const widthTransform = useTransform(distance, [-110, 0, 110], [40, 56, 40]);
  const heightTransform = useTransform(distance, [-110, 0, 110], [40, 56, 40]);
  const iconScaleTransform = useTransform(distance, [-110, 0, 110], [1, 1.35, 1]);

  const springConfig = { mass: 0.1, stiffness: 180, damping: 14 };
  const width = useSpring(isReduced ? 40 : widthTransform, springConfig);
  const height = useSpring(isReduced ? 40 : heightTransform, springConfig);
  const iconScale = useSpring(isReduced ? 1 : iconScaleTransform, springConfig);

  const isEmail = social.name === "Email";

  return (
    <div className="relative flex items-center">
      <motion.a
        ref={ref}
        href={social.href}
        data-cursor={social.cursor}
        target={!isEmail ? "_blank" : undefined}
        rel={!isEmail ? "noopener noreferrer" : undefined}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-xl flex items-center justify-center text-slate-300 hover:text-amber-400 bg-white/[0.03] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/40 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.18)] transition-colors cursor-pointer select-none"
        aria-label={social.label}
      >
        <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
          {social.icon}
        </motion.div>
      </motion.a>

      {/* Floating Tooltip positioned smoothly to the right */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 6, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[#111115] text-white border border-white/[0.12] shadow-xl pointer-events-none whitespace-nowrap z-50 flex items-center gap-1.5"
          >
            <span>{social.name}</span>
            <span className="text-[9px] text-amber-400 font-normal">↗</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SocialSidebar() {
  const mouseY = useMotionValue(Infinity);
  const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const socials = [
    {
      name: "GitHub",
      href: SOCIAL_LINKS.github,
      icon: <GithubIcon size={17} />,
      label: "GitHub Profile",
      cursor: "GH",
    },
    {
      name: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: <LinkedinIcon size={17} />,
      label: "LinkedIn Profile",
      cursor: "IN",
    },
    ...(SOCIAL_LINKS.twitter
      ? [
          {
            name: "Twitter / X",
            href: SOCIAL_LINKS.twitter,
            icon: <TwitterIcon size={16} />,
            label: "X (Twitter) Profile",
            cursor: "X",
          },
        ]
      : []),
    {
      name: "Email",
      href: `mailto:${SOCIAL_LINKS.email}`,
      icon: <Mail size={17} />,
      label: "Send Email",
      cursor: "COPY",
    },
    {
      name: "Resume",
      href: SOCIAL_LINKS.resume,
      icon: <FileText size={17} />,
      label: "View Resume PDF",
      cursor: "CV",
    },
  ];

  return (
    <aside
      aria-label="Social links sidebar"
      className="fixed left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 select-none"
    >
      {/* Floating Magnification Glass Dock (macOS Style) */}
      <motion.div
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-[#111115]/85 backdrop-blur-xl border border-white/[0.09] shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
      >
        {socials.map((social) => (
          <SocialDockIcon
            key={social.name}
            mouseY={mouseY}
            social={social}
            isReduced={isReduced}
          />
        ))}
      </motion.div>

      {/* Delicate Vertical Accent Guide Line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500/40 via-white/[0.1] to-transparent mt-1" />
    </aside>
  );
}
