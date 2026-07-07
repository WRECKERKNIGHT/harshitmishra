import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#preview-generator" },
  { label: "Story", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => {
      const sections = NAV.map(n => ({ id: n.href.slice(1), el: document.getElementById(n.href.slice(1)) }));
      for (const s of [...sections].reverse()) {
        if (s.el && window.scrollY >= s.el.offsetTop - 180) { setActive(s.id); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (href: string) => { 
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); 
    setOpen(false); 
  };

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 md:px-12">
      {/* Floating Neo-Brutalist Bar */}
      <div className="max-w-7xl mx-auto bg-white border-[3px] border-black rounded-xl shadow-[5px_5px_0px_rgba(0,0,0,1)] px-4 sm:px-6 h-16 flex items-center justify-between relative">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FFDE47] border-[2.5px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
            <span className="font-display font-black text-lg text-black">H</span>
          </div>
          <span className="font-display text-xl tracking-wider text-black block">
            HARSHIT<span className="text-[#ff1694]">!</span>
          </span>
        </button>

        {/* Center Neubrutalist Badge (Perfectly centered on all screen sizes) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center select-none pointer-events-none z-20">
          <span className="bg-[#38b6ff] text-black border-2 border-black px-2.5 py-0.5 text-[9px] font-black tracking-widest rounded-md rotate-[-2.5deg] shadow-[2px_2px_0px_#000]">
            VISIONARY '26 ⚡
          </span>
        </div>

        {/* Desktop Navigation Links (Pushed right to prevent center overlap) */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6 ml-auto mr-6 relative z-10">
          {NAV.map((n) => (
            <button key={n.label} onClick={() => go(n.href)} className="relative cursor-none group py-1">
              <span className={`font-accent text-xs tracking-wider font-extrabold uppercase transition-colors duration-150 ${
                active === n.href.slice(1) ? "text-[#ff1694]" : "text-black/60 group-hover:text-black"
              }`}>
                {n.label}
              </span>
              {active === n.href.slice(1) && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#ff1694] border border-black" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:block">
          <button 
            onClick={() => go("#contact")} 
            className="clay-btn py-2 px-5 text-xs font-black"
          >
            Hire me! ⚡
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="sm:hidden text-black cursor-none">
          {open ? <X size={20} className="stroke-[3px]" /> : <Menu size={20} className="stroke-[3px]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden relative z-10 max-w-7xl mx-auto mt-2 bg-white border-[3px] border-black rounded-xl shadow-[5px_5px_0px_rgba(0,0,0,1)] sm:hidden"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {NAV.map((n) => (
            <button key={n.label} onClick={() => go(n.href)}
              className="text-left font-accent text-sm tracking-wider font-extrabold text-black/60 hover:text-black transition-colors cursor-none uppercase">
              {n.label}
            </button>
          ))}
          <button 
            onClick={() => go("#contact")} 
            className="clay-btn mt-2 justify-center cursor-none font-black text-center"
          >
            Hire me! 💥
          </button>
        </div>
      </motion.div>
    </nav>
  );
}
