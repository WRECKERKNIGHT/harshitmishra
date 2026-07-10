import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check } from "lucide-react";

const TIMELINE = [
  {
    period: "2023 — PRESENT", 
    role: "AI Solutions Architect", 
    type: "Freelance",
    blurb: "Building automated logic engines and production-grade LLM integrations for clients worldwide.",
    wins: ["20+ complex automation workflows shipped", "100+ hours/month reclaimed for clients", "Direct integration with GPT-4, Claude & n8n"],
    accent: "#ff1694", // Pink
  },
  {
    period: "2022 — 2023", 
    role: "Full-Stack Developer", 
    type: "Client Projects",
    blurb: "Built commerce applications, secure database systems, and custom client dashboards with payment gates.",
    wins: ["Developed robust Next.js portals", "Stripe & billing logic integration", "Optimized cloud deployments for scale"],
    accent: "#38b6ff", // Cyan
  },
  {
    period: "2021 — 2022", 
    role: "Web Engineer", 
    type: "Learning & Building",
    blurb: "Dived deep into backend APIs, database design, and frontend reactive architectures.",
    wins: ["Mastered modern JS/TS stack", "Shipped multiple open-source utilities", "Database design with PostgreSQL & Prisma"],
    accent: "#52D3D8", // Green
  },
];

const SKILLS = [
  { name: "React / Next.js", pct: 95, col: "#FFDE47" }, // Yellow
  { name: "AI Integration", pct: 90, col: "#ff1694" },  // Pink
  { name: "TypeScript", pct: 90, col: "#38b6ff" },      // Cyan
  { name: "Node.js Backend", pct: 85, col: "#52D3D8" }, // Green
  { name: "UI / UX Design", pct: 88, col: "#FF9F66" },  // Orange
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="experience" ref={ref} className="relative py-28 px-6 md:px-12 overflow-hidden border-b-[6px] border-black dark:border-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative">
        <motion.div style={{ y: ghostY }} className="section-ghost-num left-0 top-0 text-black/5 dark:text-white/5">03</motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative z-10"
        >
          <div className="plasma-pill mb-5 w-fit font-bold uppercase border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]" style={{ background: "var(--neo-green)", color: "#000000" }}>
            Operational Log
          </div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-[0.9] text-black dark:text-white">
            EXPERIENCE &amp;<br />
            <span className="bg-[#52D3D8] text-black px-4 py-1.5 rotate-[1.5deg] inline-block border-[3.5px] border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] mt-3">
              SKILLS
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-7 space-y-6 relative">
            {/* Thick black vertical timeline axis */}
            <div 
              className="absolute left-6 top-6 bottom-6 w-1 bg-black dark:bg-white hidden md:block" 
            />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:pl-16 font-sans"
              >
                {/* Comic timeline node */}
                <div 
                  className="absolute left-[14px] top-8 w-6 h-6 rounded-full border-3 border-black dark:border-white hidden md:block shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] z-10"
                  style={{ background: item.accent }}
                />
                
                <div 
                  className="neo-card p-6 relative overflow-hidden bg-white dark:bg-zinc-900 border-[3.5px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 hover:shadow-[7.5px_7.5px_0px_#000] dark:hover:shadow-[7.5px_7.5px_0px_#fff] transition-all duration-300"
                  style={{
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 1}deg)`
                  }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3 pb-3 border-b-2 border-black/10 dark:border-white/10">
                    <h3 className="font-display text-xl font-black text-black dark:text-white">
                      {item.role.toUpperCase()}
                    </h3>
                    <span 
                      className="font-accent text-[10px] tracking-wider px-3 py-1 rounded-md border-2 border-black dark:border-white font-black uppercase shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] text-black"
                      style={{ background: item.accent }}
                    >
                      {item.period}
                    </span>
                  </div>
                  
                  <p className="font-accent text-xs font-black uppercase mb-3" style={{ color: item.accent }}>
                    TYPE: {item.type}
                  </p>
                  
                  <p className="font-body text-xs font-semibold text-black/60 dark:text-zinc-400 leading-relaxed mb-4">
                    "{item.blurb}"
                  </p>

                  <div className="space-y-2">
                    {item.wins.map((w, wi) => (
                      <div key={wi} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded border-2 border-black dark:border-white flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff] mt-0.5"
                          style={{ background: item.accent }}
                        >
                          <Check size={10} className="stroke-[3.5px] text-black" />
                        </div>
                        <span className="font-body text-xs font-bold text-black/75 dark:text-zinc-300">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Skill Bars */}
            <div className="neo-card p-6 bg-white dark:bg-zinc-900 border-[3.5px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] rotate-[-1deg] transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
              <p className="font-accent text-[11px] tracking-[0.2em] text-black/40 dark:text-zinc-500 uppercase mb-6 font-black">
                SKILL PROFICIENCY
              </p>
              <div className="space-y-5">
                {SKILLS.map((sk, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5 items-end">
                      <span className="font-body text-xs font-bold text-black dark:text-white">{sk.name}</span>
                      <span className="font-accent text-xs font-black text-black dark:text-white">
                        {sk.pct}%
                      </span>
                    </div>
                    {/* Comic-style thick progress bar */}
                    <div className="h-6 bg-white dark:bg-zinc-950 border-[3px] border-black dark:border-white rounded-lg overflow-hidden shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] relative transition-colors duration-300">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sk.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="h-full border-r-[3.5px] border-black dark:border-white"
                        style={{ backgroundColor: sk.col }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts Panel */}
            <div className="neo-card p-6 bg-white dark:bg-zinc-900 border-[3.5px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] rotate-[1deg] transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
              <p className="font-accent text-[11px] tracking-[0.2em] text-black/40 dark:text-zinc-500 uppercase mb-4 font-black">
                SPECIFICATIONS
              </p>
              {[
                { k: "Age", v: "17 years old" },
                { k: "Location", v: "Darbhanga, Bihar (India)" },
                { k: "Interests", v: "Pop art, Comic Panels, WebGL & AI" },
                { k: "Availability", v: "Immediate Freelance / Contract" },
              ].map((f) => (
                <div key={f.k} className="flex justify-between py-2.5 border-b-2 border-black/10 dark:border-white/10 last:border-0 items-center">
                  <span className="font-accent text-[10px] tracking-wider text-black/40 dark:text-zinc-500 font-black uppercase">
                    {f.k}
                  </span>
                  <span className="font-body text-xs font-bold text-black dark:text-white">
                    {f.v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
