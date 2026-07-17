import { useState } from "react";
import { motion } from "motion/react";
import { Crosshair, Zap, Cpu, Shield, Flame, Activity } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { ScrambleText } from "./ScrambleText";

// Arsenal loadout data structure
const CATEGORIES = [
  {
    key: "primary",
    label: "Primary Weapons",
    sub: "FRONTEND STACK",
    color: "#ff1694", // Neo Pink
    desc: "High-caliber rendering engines and responsive design frameworks built for user interactions.",
    items: [
      { id: "nextjs", name: "NEXT.JS 15", icon: "🌐", power: 96, stability: "HYPER", speed: "INSTANT", caliber: "WEB_CORE", ammo: "REACT / TS", desc: "Production-grade React engine for server-rendered page assets." },
      { id: "react", name: "REACT 19", icon: "⚛️", power: 98, stability: "SOLID", speed: "RAPID", caliber: "DOM_CORE", ammo: "JSX / TS", desc: "Declarative component library for rendering state changes." },
      { id: "typescript", name: "TYPESCRIPT", icon: "📘", power: 94, stability: "MAXIMUM", speed: "STABLE", caliber: "TYPE_SAFE", ammo: "STATIC", desc: "Strongly typed JS layer to eliminate runtime exceptions." },
      { id: "tailwind", name: "TAILWIND CSS", icon: "🎨", power: 92, stability: "SOLID", speed: "LIGHT", caliber: "UTILITY", ammo: "JIT CSS", desc: "Utility-first design engine for styling responsive layouts." }
    ]
  },
  {
    key: "heavy",
    label: "Heavy Artillery",
    sub: "BACKEND & DATA",
    color: "#FFDE47", // Neo Yellow
    desc: "Robust server runtimes, secure databases, and query structures for data operations.",
    items: [
      { id: "nodejs", name: "NODE.JS", icon: "🟢", power: 95, stability: "HIGH", speed: "FAST", caliber: "V8_ENGINE", ammo: "JAVASCRIPT", desc: "High-throughput asynchronous JavaScript execution environment." },
      { id: "postgresql", name: "POSTGRESQL", icon: "🐘", power: 90, stability: "MAXIMUM", speed: "STABLE", caliber: "SQL_REL", ammo: "SCHEMAS", desc: "Enterprise-grade relational database for reliable storage." },
      { id: "python", name: "PYTHON", icon: "🐍", power: 88, stability: "SOLID", speed: "CALC", caliber: "SCRIPTS", ammo: "AI / DATA", desc: "Core scripting language for background automation." },
      { id: "graphql", name: "GRAPHQL / REST", icon: "📈", power: 85, stability: "STABLE", speed: "RAPID", caliber: "API_GATE", ammo: "QUERIES", desc: "Flexible data query gateways to minimize client payloads." }
    ]
  },
  {
    key: "tactical",
    label: "Tactical Gear",
    sub: "INFRASTRUCTURE & DESIGN",
    color: "#38b6ff", // Neo Cyan
    desc: "Deployment workflows, containerization engines, editor environments, and canvases.",
    items: [
      { id: "git", name: "GIT / GITHUB", icon: "🐙", power: 94, stability: "MAXIMUM", speed: "SYNC", caliber: "VCS_CORE", ammo: "COMMITS", desc: "Version control sync engine to track branches and push deploys." },
      { id: "docker", name: "DOCKER", icon: "🐳", power: 86, stability: "SOLID", speed: "ISOLATED", caliber: "CONTAINER", ammo: "IMAGES", desc: "Container virtualization system for environment parity across machines." },
      { id: "figma", name: "FIGMA EDITOR", icon: "📐", power: 90, stability: "HIGH", speed: "FLOWS", caliber: "VECTOR", ammo: "PIXELS", desc: "Vector graphics canvas for mapping interface mockups." },
      { id: "vscode", name: "VS CODE", icon: "💻", power: 96, stability: "STABLE", speed: "LIGHT", caliber: "EDITOR", ammo: "EXTS", desc: "Optimized development editor built with custom terminal hooks." }
    ]
  }
];

export function TheArsenal() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Helper to draw arcade-style block bar indicators
  const renderStatBlocks = (power: number, color: string) => {
    const blocksCount = 5;
    const activeBlocks = Math.round((power / 100) * blocksCount);
    return (
      <div className="flex gap-1">
        {Array.from({ length: blocksCount }).map((_, i) => (
          <div 
            key={i} 
            className="w-4 h-3.5 border border-black rounded-sm transition-colors duration-150"
            style={{ 
              backgroundColor: i < activeBlocks ? color : "#ffffff",
              boxShadow: i < activeBlocks ? "1px 1px 0px #000" : "none"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="arsenal" className="relative py-28 px-6 md:px-12 overflow-hidden border-b-[6px] border-black">
      
      {/* Blueprint grid background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `linear-gradient(black 1.5px, transparent 1.5px), linear-gradient(90deg, black 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-ghost-num right-0 top-0 text-black/5 select-none">04</div>

        {/* Section Heading (Left Aligned for clean grid alignment) */}
        <div className="mb-16 select-none text-left">
          <div className="plasma-pill mb-5 w-fit font-bold uppercase" style={{ background: "var(--neo-pink)", color: "#ffffff" }}>
            Field Loadout
          </div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-[0.9] text-black dark:text-white">
            THE <span className="bg-[#38b6ff] text-white px-4 py-1.5 rotate-[1.5deg] inline-block border-[3.5px] border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">ARSENAL</span>
          </h2>
          <p className="font-body font-semibold text-black/60 dark:text-zinc-400 max-w-sm text-sm leading-relaxed mt-4">
            Tactical tech stack selection. Configured with optimal stability ratings and battle-tested in live production deployments.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="space-y-16">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="space-y-6">
              
              {/* Category Header Label (Neubrutalist ribbon) */}
              <div 
                onMouseEnter={() => setHoveredCategory(cat.key)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black dark:border-white pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg border-[2.5px] border-black dark:border-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] rotate-[-3deg]" style={{ background: cat.color }}>
                    <Cpu size={16} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-black dark:text-white uppercase leading-none min-w-[200px]">
                      <ScrambleText text={cat.label} trigger={hoveredCategory === cat.key} />
                    </h3>
                    <span className="font-accent text-[9px] font-black tracking-widest text-black/45 dark:text-zinc-500 block mt-0.5">
                      {cat.sub}
                    </span>
                  </div>
                </div>
                <p className="font-body text-xs font-semibold text-black/50 dark:text-zinc-400 max-w-md leading-relaxed sm:text-right">
                  {cat.cat_desc || cat.desc}
                </p>
              </div>

              {/* Grid of Weapon cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.items.map((tool) => {
                  const isHovered = hoveredCard === tool.id;
                  return (
                    <TiltCard
                      key={tool.id}
                      onMouseEnter={() => setHoveredCard(tool.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="neo-card bg-white dark:bg-zinc-900 border-[3.5px] border-black dark:border-white p-5 flex flex-col justify-between min-h-[290px] group relative select-none cursor-none shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] hover:shadow-[10px_10px_0px_#000] dark:hover:shadow-[10px_10px_0px_#fff] transition-all duration-300"
                    >
                      {/* Interactive target reticle icon */}
                      <div className="absolute top-4 right-4 text-black/10 group-hover:text-black dark:text-white/10 dark:group-hover:text-white transition-colors duration-150">
                        <motion.div
                          animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
                          transition={{ type: "spring", stiffness: 120 }}
                        >
                          <Crosshair size={18} className="stroke-[2.5]" />
                        </motion.div>
                      </div>

                      {/* Header row */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <motion.span 
                            animate={isHovered ? { 
                              y: [0, -6, 0],
                              rotate: [0, -4, 4, 0]
                            } : {}}
                            transition={{ 
                              duration: 0.4, 
                              ease: "easeInOut",
                              repeat: isHovered ? Infinity : 0,
                              repeatDelay: 0.08
                            }}
                            className="text-3xl filter drop-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] select-none inline-block"
                          >
                            {tool.icon}
                          </motion.span>
                          <div>
                            <h4 className="font-display text-xl text-black dark:text-white tracking-wide leading-none">
                              {tool.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] border border-black animate-pulse" />
                              <span className="font-accent text-[8px] font-black tracking-widest text-[#39ff14] uppercase">
                                {tool.stability}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Telemetry specs sheet (Arcade layout) */}
                      <div className="bg-[#FFFDEC] dark:bg-zinc-950 border-2 border-black dark:border-white rounded-lg p-3 my-4 space-y-2 relative z-10 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] transition-all duration-300">
                        <div className="grid grid-cols-2 gap-y-1.5 text-[8px] font-bold text-black/70 dark:text-zinc-300">
                          <div>
                            <span className="text-black/35 dark:text-zinc-500 font-extrabold uppercase tracking-wide block">Caliber</span>
                            <span className="font-mono text-black dark:text-white">{tool.caliber}</span>
                          </div>
                          <div>
                            <span className="text-black/35 dark:text-zinc-500 font-extrabold uppercase tracking-wide block">Ammo</span>
                            <span className="font-mono text-black dark:text-white">{tool.ammo}</span>
                          </div>
                          <div>
                            <span className="text-black/35 dark:text-zinc-500 font-extrabold uppercase tracking-wide block">Stability</span>
                            <span className="font-mono text-zinc-800 dark:text-zinc-200">{tool.stability}</span>
                          </div>
                          <div>
                            <span className="text-black/35 dark:text-zinc-500 font-extrabold uppercase tracking-wide block">Speed</span>
                            <span className="font-mono" style={{ color: cat.color }}>{tool.speed}</span>
                          </div>
                        </div>

                        {/* Power Capacity Bar */}
                        <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                          <span className="font-accent text-[8px] font-black uppercase text-black/50 dark:text-zinc-400">Capacity</span>
                          {renderStatBlocks(tool.power, cat.color)}
                        </div>
                      </div>

                      {/* Technical Description info bubble */}
                      <p className="font-body text-[10px] font-semibold text-black/60 dark:text-zinc-400 leading-relaxed">
                        {tool.desc}
                      </p>
                    </TiltCard>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
