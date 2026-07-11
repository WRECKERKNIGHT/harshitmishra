import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Brain, Settings, Cpu } from "lucide-react";
import { DotShader } from "./DotShader";

interface DataCardProps {
  title?: string;
  icon?: React.ReactNode;
  content: string;
  className: string;
}

function DataCard({ title, icon, content, className }: DataCardProps) {
  return (
    <div className={`bg-white dark:bg-zinc-900 border-[2.5px] border-black dark:border-white rounded-lg shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] overflow-hidden flex flex-col select-none transition-all duration-300 ${className}`}>
      {/* Header bar */}
      <div className="bg-[#FFDE47] border-b-[2.5px] border-black dark:border-white px-2 py-1 flex items-center justify-between">
        <span className="font-accent text-[9px] font-black uppercase text-black">Data</span>
        <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center text-[7px] font-black bg-white dark:bg-zinc-800 text-black dark:text-white cursor-none leading-none">
          ×
        </div>
      </div>
      {/* Content body */}
      <div className="p-2.5 bg-white dark:bg-zinc-900 flex flex-col gap-1 text-left transition-all duration-300">
        {title && (
          <div className="flex items-center gap-1.5">
            {icon}
            <span className="font-display text-sm font-black text-black dark:text-white leading-none">{title.toUpperCase()}</span>
          </div>
        )}
        <p className="font-body text-[10px] font-bold text-black/60 dark:text-zinc-400 leading-tight">{content}</p>
      </div>
    </div>
  );
}

const ROLES = ["Tech Visionary", "AI Systems Builder", "Automation Engineer", "Full-Stack Dev"];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(t);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-20">
      {/* 2D comic floating elements layer */}
      <DotShader />

      {/* Main Content Flex Grid */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-6 lg:pt-10 pb-8 flex-grow flex items-center"
      >
        {/* Responsive row alignment - stacked on mobile, row on large screens */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">
          
          {/* Left Column: Hello & Bold Titles */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Title Block 1 (HARSHIT) */}
            <div className="mb-2 w-fit mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 14, delay: 0.15 }}
                className="bg-[#ff1694] border-[4px] border-black px-6 py-1.5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rotate-[-4deg]"
              >
                <h1 className="font-display text-[clamp(2.8rem,7.5vw,6.5rem)] text-white leading-none uppercase tracking-wide select-none">
                  HARSHIT
                </h1>
              </motion.div>
            </div>

            {/* Title Block 2 (MISHRA!) */}
            <div className="mb-6 w-fit mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ type: "spring", stiffness: 350, damping: 14, delay: 0.25 }}
                className="bg-[#FFDE47] border-[4px] border-black px-6 py-1.5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rotate-[2deg]"
              >
                <h1 className="font-display text-[clamp(2.8rem,7.5vw,6.5rem)] text-black leading-none uppercase tracking-wide select-none">
                  MISHRA<span className="text-[#ff1694]">!</span>
                </h1>
              </motion.div>
            </div>

            {/* Cartoon Speech Bubble containing Roles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6 mx-auto lg:mx-0"
            >
              <div className="speech-bubble bg-white dark:bg-zinc-900 text-black dark:text-white font-accent text-sm md:text-base font-black uppercase tracking-wider rotate-[-1deg] flex items-center gap-1">
                💥 ACTIVE ROLE: <span className="text-[#ff1694] font-extrabold">{ROLES[roleIndex]}</span> 💥
              </div>
            </motion.div>

            {/* Comic narration box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#FFFDEC] dark:bg-zinc-900 border-[3px] border-black dark:border-white p-4.5 shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#fff] max-w-md rotate-[0.5deg] mb-6 transition-all duration-300 mx-auto lg:mx-0"
            >
              <p className="font-body text-[11px] md:text-xs font-bold text-black dark:text-zinc-200 leading-relaxed">
                "17-year-old builder from Darbhanga. I design and ship intelligent systems — from AI integrations to full-stack platforms — that actually work in production."
              </p>
            </motion.div>

            {/* Squishy clay buttons CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button onClick={() => go("services")} className="clay-btn font-black uppercase">
                SEE MY WORK →
              </button>
              <button onClick={() => go("contact")} className="clay-btn clay-btn-secondary font-black uppercase">
                LET'S TALK! 💥
              </button>
            </motion.div>
          </div>

          {/* Right Column: Cartoon Brain & absolute Data cards */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative select-none mt-10 lg:mt-0">
            
            {/* Fluid wrapper: dynamically scales, aspect ratio maintains a perfect square layout */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center group/brain"
            >
              {/* Spinning target grid behind brain */}
              <div className="absolute w-[82%] h-[82%] rounded-full border-2 border-dashed border-black/10 dark:border-white/10 z-0 animate-[spin_45s_linear_infinite] pointer-events-none transition-colors duration-300" />
              <div className="absolute w-[68%] h-[68%] rounded-full border border-dotted border-black/5 dark:border-white/5 z-0 animate-[spin_20s_linear_infinite_reverse] pointer-events-none transition-colors duration-300" />

              {/* Scanning sweep laser line */}
              <div className="absolute left-[11%] right-[11%] h-[2px] bg-[#ff1694] dark:bg-[#38b6ff] opacity-40 z-20 pointer-events-none animate-scan-sweep border-t border-[#ff1694] dark:border-[#38b6ff]" />

              {/* Monospace telemetry logs HUD */}
              <div className="absolute bottom-[-6%] right-[4%] bg-[#FFFDEC] dark:bg-zinc-950 border-2 border-black dark:border-white rounded px-2.5 py-1 font-mono text-[7px] tracking-wider text-black dark:text-zinc-400 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] z-30 select-none animate-pulse transition-all duration-300">
                SYS_FEED: ACTIVE // LAT: 25.5° N // HZ: 60.0
              </div>

              {/* Responsive scaling brain illustration */}
              <img 
                src="/brain-globe-clean.png" 
                alt="Intelligent Brain Globe" 
                className="w-[78%] h-[78%] object-contain cartoon-bob relative z-10"
              />

              {/* Percentage-positioned responsive yellow OS data cards (hidden on mobile to prevent layout leak) */}
              {/* Data Card 1: Top-Left */}
              <DataCard 
                title="AI"
                icon={<Brain size={14} className="stroke-[2.5px]" />}
                content="17-yea-old builder from AI stems and intelligent systems to from AI."
                className="absolute top-[-5%] left-[-10%] w-[44%] z-20 rotate-[-3deg] hidden md:flex"
              />

              {/* Data Card 2: Top-Right */}
              <DataCard 
                title="Systems"
                icon={<Settings size={14} className="stroke-[2.5px]" />}
                content="AI stode cutback systems and intelligent systems to full-stack platforms."
                className="absolute top-[-5%] right-[-10%] w-[44%] z-20 rotate-[3deg] hidden md:flex"
              />

              {/* Data Card 3: Bottom-Left */}
              <DataCard 
                content="AI basie conroputational > Air-intergracy"
                className="absolute bottom-[5%] left-[-8%] w-[44%] z-20 rotate-[2deg] hidden md:flex"
              />

              {/* Data Card 4: Bottom-Right */}
              <DataCard 
                content="17-year-old intelligent systema — from AI/stack systems."
                className="absolute bottom-[5%] right-[-8%] w-[44%] z-20 rotate-[-2deg] hidden md:flex"
              />

            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Marquee Text Ticker Ribbon */}
      <div className="w-full bg-[#FFDE47] border-y-[3.5px] border-black py-2.5 overflow-hidden relative z-20 -rotate-1 shadow-[4px_4px_0px_#000] mt-auto">
        <div className="ticker-inner flex whitespace-nowrap gap-8 text-black font-display text-lg sm:text-xl uppercase tracking-wider">
          <span>AI INTEGRATIONS • PRODUCT DESIGNER • SYSTEMS AUTOMATION • CHATBOT WORKFLOWS • NEXT.JS RAPID MVPS • AI INTEGRATIONS • PRODUCT DESIGNER •</span>
          <span>AI INTEGRATIONS • PRODUCT DESIGNER • SYSTEMS AUTOMATION • CHATBOT WORKFLOWS • NEXT.JS RAPID MVPS • AI INTEGRATIONS • PRODUCT DESIGNER •</span>
        </div>
      </div>
    </section>
  );
}
