import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { SOCIAL_LINKS } from "../config";

export default function SocialSidebar() {
  const socials = [
    {
      name: "GitHub",
      href: SOCIAL_LINKS.github,
      icon: <GithubIcon size={18} />,
      label: "GitHub Profile",
    },
    {
      name: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: <LinkedinIcon size={18} />,
      label: "LinkedIn Profile",
    },
    {
      name: "Email",
      href: `mailto:${SOCIAL_LINKS.email}`,
      icon: <Mail size={18} />,
      label: "Send Email",
    },
  ];

  return (
    <aside
      aria-label="Social links sidebar"
      className="fixed left-3 sm:left-5 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 select-none"
    >
      {/* Floating Frosted Glass Dock */}
      <div className="flex flex-col items-center gap-2.5 p-2 rounded-2xl bg-[#0e1117]/85 light:bg-white/90 backdrop-blur-xl border border-white/[0.08] light:border-slate-300/80 shadow-[0_8px_30px_rgb(0,0,0,0.35)] light:shadow-[0_8px_25px_rgba(15,23,42,0.08)]">
        {socials.map((social) => (
          <div key={social.name} className="relative group flex items-center">
            <a
              href={social.href}
              target={social.name !== "Email" ? "_blank" : undefined}
              rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
              className="p-2.5 rounded-xl text-slate-300 light:text-slate-700 hover:text-amber-400 light:hover:text-amber-600 hover:bg-white/[0.06] light:hover:bg-slate-100 border border-transparent hover:border-amber-500/30 light:hover:border-amber-500/40 transition-all duration-200 flex items-center justify-center cursor-pointer"
              aria-label={social.label}
            >
              {social.icon}
            </a>

            {/* Hover Tooltip Tag on the right with dark/light high-contrast styling */}
            <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-slate-900 text-slate-100 light:bg-slate-900 light:text-white border border-white/[0.1] light:border-slate-800 shadow-xl pointer-events-none opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap z-50">
              {social.name}
            </span>
          </div>
        ))}
      </div>

      {/* Delicate Vertical Guide Line */}
      <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-white/[0.18] light:from-slate-300 to-transparent mt-1" />
    </aside>
  );
}
