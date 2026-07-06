import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ChevronRight, Check, Palette } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const TYPE_MAP: Record<string, { label: string; icon: string; features: string[] }> = {
  website:    { label: "Smart Website",    icon: "🌐", features: ["SEO optimized", "AI-powered chat", "Analytics"] },
  ecommerce:  { label: "E-Commerce",       icon: "🛒", features: ["Stripe payments", "Inventory", "Order tracking"] },
  crm:        { label: "CRM System",       icon: "📊", features: ["Pipeline view", "Auto follow-ups", "Reports"] },
  automation: { label: "Automation",       icon: "⚙️", features: ["Workflow builder", "API hooks", "Scheduling"] },
  app:        { label: "Custom App",       icon: "📱", features: ["Cross-platform", "Real-time sync", "Notifications"] },
};

export function PreviewGenerator() {
  const [name, setName]       = useState("");
  const [type, setType]       = useState("");
  const [desc, setDesc]       = useState("");
  const [color, setColor]     = useState("#FFDE47"); // Default to Neo Yellow
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ name: string; type: string; desc: string; color: string } | null>(null);

  const canGo = name && type && desc;

  const generate = () => {
    if (!canGo || loading) return;
    setLoading(true);
    setTimeout(() => { 
      setLoading(false); 
      setResult({ name, type, desc, color }); 
    }, 1200);
  };

  return (
    <section id="preview-generator" className="relative py-28 px-6 md:px-12 overflow-hidden border-b-[6px] border-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="section-ghost-num right-0 top-0 text-black/5">02</div>

        <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-14 relative z-10"
        >
          <div className="plasma-pill mb-5 w-fit font-bold uppercase" style={{ background: "var(--neo-pink)", color: "#ffffff" }}>
            Interactive Engine
          </div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-[0.9] text-black">
            CONCEPT<br />
            <span className="bg-[#ff1694] text-white px-4 py-1.5 rotate-[-1.5deg] inline-block border-[3.5px] border-black shadow-[4px_4px_0px_#000]">
              PREVIEW
            </span>
          </h2>
          <p className="font-body font-semibold text-black/60 max-w-sm text-sm leading-relaxed mt-4">
            Build your project idea interactively and watch the system generate a live design mockup schema below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Input Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="neo-card p-6 md:p-8 space-y-6 bg-white"
          >
            <div className="flex items-center gap-2 mb-2 pb-4 border-b-2 border-black">
              {["var(--neo-cyan)", "var(--neo-pink)", "var(--neo-yellow)"].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-black" style={{ background: c }} />
              ))}
              <span className="ml-2 font-accent font-black text-[10px] tracking-widest text-black/40 uppercase">
                INPUT_SHEET
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black">
                Project Title
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g. NexGen AI Platform"
                className="w-full h-11 bg-white border-[3px] border-black rounded-lg px-4 font-body text-sm text-black placeholder:text-black/30 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black">
                Category
              </label>
              <Select onValueChange={setType}>
                <SelectTrigger className="bg-white border-[3px] border-black text-black rounded-lg h-11 font-body text-sm shadow-[2px_2px_0px_#000] focus:ring-0 focus:outline-none">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[3px] border-black rounded-lg shadow-[4px_4px_0px_#000]">
                  {Object.entries(TYPE_MAP).map(([v, d]) => (
                    <SelectItem key={v} value={v} className="font-body text-sm text-black focus:bg-[#FFDE47]">
                      {d.icon} {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black">
                Narrative Pitch
              </label>
              <textarea 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                placeholder="Describe what you want to build..." 
                rows={3}
                className="w-full bg-white border-[3px] border-black rounded-lg px-4 py-3 font-body text-sm text-black placeholder:text-black/30 focus:outline-none resize-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase flex items-center gap-1.5 text-black">
                <Palette size={12} className="stroke-[2.5px]" /> Brand Color
              </label>
              <div className="flex gap-3 items-center">
                <input 
                  type="color" 
                  value={color} 
                  onChange={e => setColor(e.target.value)} 
                  className="w-12 h-12 rounded-lg border-[3px] border-black cursor-none bg-transparent p-0" 
                />
                <input 
                  type="text" 
                  value={color} 
                  onChange={e => setColor(e.target.value)} 
                  className="flex-1 h-12 bg-white border-[3px] border-black rounded-lg px-4 font-accent text-sm text-black/60 shadow-[2px_2px_0px_#000] focus:outline-none" 
                />
              </div>
            </div>

            <button 
              onClick={generate} 
              disabled={!canGo || loading}
              className="w-full clay-btn justify-center font-black"
              style={{ 
                backgroundColor: canGo ? color : "#e5e7eb",
                opacity: canGo ? 1 : 0.6 
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin stroke-[3px]" /> 
                  GENERATING...
                </>
              ) : (
                <>
                  <ChevronRight size={16} className="stroke-[3px]" /> 
                  GENERATE DESIGN PREVIEW
                </>
              )}
            </button>
          </motion.div>

          {/* Output Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="neo-card p-6 md:p-8 bg-white min-h-[480px] flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-black">
              {["var(--neo-cyan)", "var(--neo-pink)", "var(--neo-yellow)"].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-black" style={{ background: c }} />
              ))}
              <span className="ml-2 font-accent font-black text-[10px] tracking-widest text-black/40 uppercase">
                RENDER_OUTPUT
              </span>
            </div>

            <div className="flex-grow flex items-center justify-center">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    key="result" 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.3 }} 
                    className="w-full space-y-5"
                  >
                    <div 
                      className="neo-card p-5 bg-white border-l-[12px]" 
                      style={{ borderLeftColor: result.color }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{TYPE_MAP[result.type]?.icon}</span>
                        <div>
                          <h3 className="font-display text-2xl text-black leading-tight">
                            {result.name}
                          </h3>
                          <span 
                            className="font-accent text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md border-2 border-black inline-block mt-1" 
                            style={{ background: result.color, color: "#000" }}
                          >
                            {TYPE_MAP[result.type]?.label.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-xs font-semibold text-black/60 leading-relaxed">
                        "{result.desc}"
                      </p>
                    </div>

                    <div className="space-y-2 bg-[#FFFDEC] border-[3px] border-black p-4 rounded-lg shadow-[3px_3px_0px_#000]">
                      {TYPE_MAP[result.type]?.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 py-1 border-b border-black/5 last:border-0">
                          <div className="w-4 h-4 rounded-full bg-white border-2 border-black flex items-center justify-center">
                            <Check size={10} className="stroke-[3.5px] text-black" />
                          </div>
                          <span className="font-body text-xs font-bold text-black">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Comic Browser/App mock wireframe */}
                    <div className="rounded-xl overflow-hidden border-[3px] border-black bg-[#FFFDEC] shadow-[3px_3px_0px_#000]">
                      <div className="h-7 flex items-center gap-1.5 px-3 border-b-2 border-black bg-white">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-2.5 h-2.5 rounded-full border border-black bg-black/10" />
                        ))}
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 rounded-md border-2 border-black" style={{ background: result.color }} />
                        <div className="grid grid-cols-3 gap-2">
                          {[0, 1, 2].map(i => (
                            <div 
                              key={i} 
                              className="h-10 rounded-md border-2 border-black" 
                              style={{ background: i === 0 ? result.color : "#ffffff" }} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} 
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-[#FFDE47] border-[3px] border-black shadow-[3px_3px_0px_#000]"
                    >
                      <Palette size={26} className="text-black stroke-[2.5px]" />
                    </motion.div>
                    <p className="font-display text-xl font-black text-black mb-2">AWAITING ENGINE INPUT</p>
                    <p className="font-body text-xs text-black/50 font-bold max-w-xs mx-auto leading-relaxed">
                      Fill out the specification cards on the left panel to trigger the wireframe mockup builder.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
