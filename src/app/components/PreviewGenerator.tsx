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

const LOGS = [
  "⚡ INITIALIZING LAYOUT COMPILER...",
  "🔍 PARSING NARRATIVE PROMPT...",
  "🎨 COMPILING COLOR PALETTE...",
  "🛠️ RENDERING WIREFRAME COMPONENTS...",
  "🚀 MOUNTING LIVE PREVIEW PANEL..."
];

const getMockupContent = (name: string, desc: string) => {
  const lowercase = `${name.toLowerCase()} ${desc.toLowerCase()}`;
  
  if (lowercase.includes("crypto") || lowercase.includes("coin") || lowercase.includes("finance") || lowercase.includes("bank") || lowercase.includes("wallet") || lowercase.includes("trade") || lowercase.includes("pay")) {
    return {
      title: "Decentralized Ledger Stack",
      badge: "SECURE CRYPTO PROTOCOL",
      stat1Label: "TRANSACTION VOL",
      stat1Val: "$840.4M",
      stat1Trend: "+24.5%",
      stat2Label: "GAS FEE",
      stat2Val: "14 Gwei",
      stat2Trend: "-8.1%",
      stat3Label: "BLOCK TIME",
      stat3Val: "12s",
      stat3Trend: "OPTIMIZED",
      icon1: "💰",
      icon2: "🔐",
      icon3: "⚡",
      bubbleQ: `Explain how transaction flows work on ${name}.`,
      bubbleA: `Our core protocol integrates smart contract pipelines to compile gasless transactions, verifying block ledger payloads in under 12 seconds.`,
      featureText: "Decentralized liquidity bridges"
    };
  }

  if (lowercase.includes("music") || lowercase.includes("sound") || lowercase.includes("podcast") || lowercase.includes("audio") || lowercase.includes("player") || lowercase.includes("spotify")) {
    return {
      title: "Surround Acoustics Engine",
      badge: "DYNAMIC AUDIO SHADER",
      stat1Label: "STREAMING RATE",
      stat1Val: "320 kbps",
      stat1Trend: "LOSSLESS",
      stat2Label: "ACTIVE LISTENERS",
      stat2Val: "4,821",
      stat2Trend: "+12.4%",
      stat3Label: "LATENCY",
      stat3Val: "4.8ms",
      stat3Trend: "ULTRA_LOW",
      icon1: "🎵",
      icon2: "🎧",
      icon3: "🎛️",
      bubbleQ: `How does ${name} stream high-fidelity files without buffering?`,
      bubbleA: `By chunking audio arrays and pre-rendering stream packets on edge nodes, resulting in 4.8ms server response latencies.`,
      featureText: "Lossless audio streaming"
    };
  }

  if (lowercase.includes("ai") || lowercase.includes("agent") || lowercase.includes("gpt") || lowercase.includes("model") || lowercase.includes("smart") || lowercase.includes("brain") || lowercase.includes("neural") || lowercase.includes("bot")) {
    return {
      title: "Neural Network Pipeline",
      badge: "COGNITIVE AI CORE",
      stat1Label: "MODEL RESPONSE",
      stat1Val: "112 tok/s",
      stat1Trend: "HYPER",
      stat2Label: "CONTEXT WINDOW",
      stat2Val: "128K",
      stat2Trend: "MAX",
      stat3Label: "ACCURACY",
      stat3Val: "99.8%",
      stat3Trend: "VERIFIED",
      icon1: "🧠",
      icon2: "⚙️",
      icon3: "🔮",
      bubbleQ: `Can ${name} automate my business pipeline?`,
      bubbleA: `Yes, the cognitive neural layers analyze contextual workflow schemas and generate autonomous script agents to execute workflows locally.`,
      featureText: "Neural agent workflow automation"
    };
  }

  return {
    title: "Enterprise Platform Pipeline",
    badge: "PRODUCTION READY SYSTEM",
    stat1Label: "TOTAL SALES",
    stat1Val: "$14,240",
    stat1Trend: "+18.4%",
    stat2Label: "CONVERSION",
    stat2Val: "4.2%",
    stat2Trend: "+2.1%",
    stat3Label: "RESPONSE TIME",
    stat3Val: "240ms",
    stat3Trend: "OPTIMIZED",
    icon1: "📊",
    icon2: "👥",
    icon3: "⚙️",
    bubbleQ: `Why choose ${name} over traditional layouts?`,
    bubbleA: `Our systems compile layout modules statically to remove runtime rendering gaps, giving you faster loading speeds and optimized performance scores.`,
    featureText: "Static layout compilation"
  };
};

export function PreviewGenerator() {
  const [name, setName]       = useState("");
  const [type, setType]       = useState("");
  const [desc, setDesc]       = useState("");
  const [color, setColor]     = useState("#FFDE47"); // Default to Neo Yellow
  const [loading, setLoading] = useState(false);
  const [logIndex, setLogIndex] = useState(-1);
  const [result, setResult]   = useState<{ name: string; type: string; desc: string; color: string } | null>(null);

  const canGo = name && type && desc;

  const generate = () => {
    if (!canGo || loading) return;
    setLoading(true);
    setLogIndex(0);
    setResult(null);

    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 280);

    setTimeout(() => { 
      setLoading(false); 
      setLogIndex(-1);
      setResult({ name, type, desc, color }); 
    }, 1500);
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

          {/* Output Panel (Real-looking standard website previews) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="neo-card bg-[#18181b] border-[3px] border-black rounded-2xl min-h-[520px] flex flex-col overflow-hidden shadow-[6px_6px_0px_#000] p-0"
          >
            {/* Browser Header Bar */}
            <div className="h-10 bg-[#09090b] border-b-2 border-black flex items-center justify-between px-4 select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black/20" />
              </div>
              <div className="bg-[#18181b] border border-black/30 rounded px-4 py-0.5 text-[9px] text-zinc-400 font-mono tracking-wide w-48 text-center truncate">
                {result ? `${result.name.toLowerCase().replace(/\s+/g, '-')}.com` : 'awaiting-engine-input.io'}
              </div>
              <div className="w-10" />
            </div>

            {/* Live Interactive Rendering Area */}
            <div className="flex-grow bg-[#09090b] relative overflow-y-auto max-h-[480px] flex flex-col">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading-console" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="w-full h-full p-6 flex flex-col font-mono text-[9px] text-zinc-300 gap-2.5 items-start justify-center text-left bg-[#0c0c0e] flex-grow min-h-[300px]"
                  >
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 w-full mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                      <span className="font-bold text-[8px] tracking-wider text-zinc-500 uppercase">TELEMETRY_LOG_CONSOLE</span>
                    </div>
                    {LOGS.map((log, index) => (
                      index <= logIndex && (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          className="flex items-center gap-2 font-mono text-[8px]"
                        >
                          <span style={{ color: color }}>[OK]</span>
                          <span>{log}</span>
                        </motion.div>
                      )
                    ))}
                    {logIndex < 4 && (
                      <div className="flex items-center gap-1.5 text-zinc-500 animate-pulse mt-2 font-mono text-[8px]">
                        <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: color }} />
                        <span>COMPILING MODULES...</span>
                      </div>
                    )}
                  </motion.div>
                ) : result ? (() => {
                  const content = getMockupContent(result.name, result.desc);
                  return (
                    <motion.div 
                      key={result.type} 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ duration: 0.25 }}
                      className="w-full h-full flex flex-col flex-grow"
                    >
                      {result.type === "website" && (
                        <div className="w-full h-full bg-[#09090b] text-white flex flex-col font-sans text-left flex-grow">
                          {/* Nav */}
                          <div className="h-11 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-[#09090b]">
                            <span className="font-bold text-xs tracking-wide animate-pulse" style={{ color: result.color }}>{result.name}</span>
                            <div className="flex gap-3 text-[9px] text-zinc-400 font-semibold">
                              <span>Features</span>
                              <span>Pricing</span>
                              <span>Docs</span>
                            </div>
                            <button className="text-[8px] font-bold px-2 py-0.5 rounded shadow-sm hover:scale-105 transition-transform" style={{ backgroundColor: result.color, color: '#000' }}>
                              Launch App
                            </button>
                          </div>
                          
                          {/* Hero */}
                          <div className="p-5 space-y-3.5 text-center max-w-sm mx-auto my-auto py-8">
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-400 font-semibold mx-auto uppercase tracking-wide">
                              <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: result.color }} />
                              {content.badge}
                            </div>
                            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight text-white">
                              {content.title.split(" ").slice(0,-1).join(" ")} <span style={{ color: result.color }}>{result.name}</span>
                            </h1>
                            <p className="text-[10px] text-zinc-450 leading-normal font-normal">
                              {result.desc}
                            </p>
                            <div className="flex justify-center gap-2.5 pt-1">
                              <button className="text-[9px] font-bold px-3 py-1.5 rounded-md text-black transition-transform hover:scale-95 shadow" style={{ backgroundColor: result.color }}>
                                Get Started Free
                              </button>
                              <button className="text-[9px] font-bold px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-800">
                                Book Demo
                              </button>
                            </div>
                          </div>

                          {/* Small mock screen */}
                          <div className="px-4 pb-4 mt-auto">
                            <div className="border border-zinc-850 rounded-lg overflow-hidden bg-zinc-950 p-2 space-y-1.5">
                              <div className="flex justify-between items-center border-b border-zinc-850 pb-1.5">
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                </div>
                                <span className="text-[7px] text-zinc-500 font-mono uppercase tracking-wider">{content.stat1Label}: {content.stat1Val}</span>
                              </div>
                              <div className="h-14 bg-zinc-900/30 rounded flex items-center justify-center relative">
                                <div className="h-8 w-[75%] border border-dashed border-zinc-850 rounded flex items-center justify-center text-[9px] text-zinc-600 font-mono gap-1.5 select-none">
                                  <span>{content.icon1}</span>
                                  <span>{content.title.toUpperCase()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {result.type === "ecommerce" && (
                        <div className="w-full h-full bg-zinc-50 text-zinc-900 flex flex-col font-sans text-left flex-grow">
                          {/* Nav */}
                          <div className="h-11 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0">
                            <span className="font-extrabold text-xs tracking-tight text-zinc-900">{result.name}<span style={{ color: result.color }}>.</span></span>
                            <div className="flex gap-3 text-[9px] text-zinc-505 font-bold">
                              <span>Shop</span>
                              <span>Deals</span>
                              <span>Cart (0)</span>
                            </div>
                          </div>
                          
                          {/* Hero Product Spotlight */}
                          <div className="grid grid-cols-2 gap-4 p-5 my-auto items-center">
                            <div className="space-y-2">
                              <span className="text-[7px] font-black tracking-widest text-zinc-400 uppercase">{content.badge}</span>
                              <h2 className="text-lg md:text-xl font-black tracking-tight text-zinc-900 leading-tight">
                                {result.name}
                              </h2>
                              <p className="text-[9px] text-zinc-550 leading-normal">
                                {result.desc}
                              </p>
                              <div className="flex items-baseline gap-1.5 pt-0.5">
                                <span className="text-base font-extrabold text-zinc-900">{content.stat1Val}</span>
                                <span className="text-[9px] text-zinc-400 line-through">$249.00</span>
                              </div>
                              <button className="w-full text-[9px] font-bold px-3 py-1.5 rounded-md text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5 shadow" style={{ backgroundColor: result.color, color: "#000" }}>
                                Buy Now ({content.icon1})
                              </button>
                            </div>

                            <div className="aspect-square bg-white border border-zinc-200 rounded-xl flex items-center justify-center p-4 relative overflow-hidden shadow-sm">
                              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${result.color} 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
                              <div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow bg-zinc-50 border border-zinc-200 z-10 animate-bounce">
                                {content.icon1}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {result.type === "crm" && (
                        <div className="w-full h-full bg-[#09090b] text-white flex font-sans text-left flex-grow">
                          {/* Sidebar */}
                          <div className="w-12 border-r border-zinc-850 bg-zinc-900/30 p-2 flex flex-col gap-3.5 items-center shrink-0">
                            <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-black text-black shadow-sm" style={{ backgroundColor: result.color }}>
                              {result.name.charAt(0)}
                            </div>
                            <div className="w-5 h-5 rounded bg-zinc-850 flex items-center justify-center text-[9px] border border-zinc-800">{content.icon1}</div>
                            <div className="w-5 h-5 rounded bg-zinc-900/40 flex items-center justify-center text-[9px] text-zinc-600">{content.icon2}</div>
                            <div className="w-5 h-5 rounded bg-zinc-900/40 flex items-center justify-center text-[9px] text-zinc-600">{content.icon3}</div>
                          </div>

                          {/* Content */}
                          <div className="flex-grow flex flex-col p-4 overflow-y-auto space-y-3.5">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">{content.badge}</h3>
                                <h2 className="text-[11px] font-black text-white uppercase tracking-wider">{result.name} Dashboard</h2>
                              </div>
                              <div className="w-5 h-5 rounded-full bg-zinc-850 border border-zinc-800 flex items-center justify-center text-[9px]">{content.icon2}</div>
                            </div>

                            {/* KPI Row */}
                            <div className="grid grid-cols-3 gap-1.5">
                              <div className="bg-zinc-900/60 border border-zinc-855 p-1.5 rounded space-y-0.5">
                                <span className="text-[7px] text-zinc-500 uppercase font-semibold block truncate">{content.stat1Label}</span>
                                <div className="text-[10px] font-bold">{content.stat1Val}</div>
                                <div className="text-[6px]" style={{ color: result.color }}>{content.stat1Trend}</div>
                              </div>
                              <div className="bg-zinc-900/60 border border-zinc-855 p-1.5 rounded space-y-0.5">
                                <span className="text-[7px] text-zinc-500 uppercase font-semibold block truncate">{content.stat2Label}</span>
                                <div className="text-[10px] font-bold">{content.stat2Val}</div>
                                <div className="text-[6px]" style={{ color: result.color }}>{content.stat2Trend}</div>
                              </div>
                              <div className="bg-zinc-900/60 border border-zinc-855 p-1.5 rounded space-y-0.5">
                                <span className="text-[7px] text-zinc-500 uppercase font-semibold block truncate">{content.stat3Label}</span>
                                <div className="text-[10px] font-bold truncate">{content.stat3Val}</div>
                                <div className="text-[6px]" style={{ color: result.color }}>{content.stat3Trend}</div>
                              </div>
                            </div>

                            {/* Pipeline Table */}
                            <div className="bg-zinc-900/60 border border-zinc-855 rounded p-2.5 space-y-1.5">
                              <h4 className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">System Telemetry Log</h4>
                              <div className="space-y-1 text-[7px] font-mono">
                                <div className="flex justify-between py-0.5 border-b border-zinc-800 text-zinc-500 font-bold">
                                  <span>Metric Layer</span>
                                  <span>State</span>
                                  <span>Load</span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-zinc-850/40">
                                  <span className="text-zinc-200 truncate max-w-[70px]">Core Thread</span>
                                  <span className="px-1 py-0.2 rounded-full text-[6px]" style={{ backgroundColor: `${result.color}22`, color: result.color }}>Active</span>
                                  <span className="text-zinc-200 font-bold">{content.stat1Val}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-zinc-200 truncate max-w-[70px]">Relay Server</span>
                                  <span className="px-1 py-0.2 rounded-full text-[6px]" style={{ backgroundColor: `${result.color}22`, color: result.color }}>Optimized</span>
                                  <span className="text-zinc-200 font-bold">{content.stat2Val}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {result.type === "automation" && (
                        <div className="w-full h-full bg-[#0a0a0c] text-white flex flex-col font-sans text-left relative overflow-hidden flex-grow">
                          {/* Grid bg */}
                          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(zinc-800 1px, transparent 1px)`, backgroundSize: '12px 12px' }} />

                          {/* Header */}
                          <div className="h-11 border-b border-zinc-850 flex items-center justify-between px-4 shrink-0 relative z-10 bg-[#0a0a0c]/80 backdrop-blur-sm">
                            <span className="font-bold text-[10px]" style={{ color: result.color }}>{result.name} Logic Node</span>
                            <span className="text-[7px] font-black tracking-widest text-[#39ff14] border border-[#39ff14]/30 px-1.5 py-0.2 rounded bg-[#39ff14]/10">ACTIVE TELEMETRY</span>
                          </div>

                          {/* Node canvas */}
                          <div className="flex-grow p-4 flex flex-col gap-3 items-center justify-center relative z-10 my-auto">
                            {/* Node 1 */}
                            <div className="w-36 bg-zinc-900 border border-zinc-800 p-1.5 rounded flex items-center gap-2 shadow relative">
                              <div className="w-5 h-5 rounded bg-green-500/20 text-green-500 border border-green-500/30 flex items-center justify-center text-[10px]">🔌</div>
                              <div>
                                <h4 className="text-[7px] font-bold text-zinc-500">Node_Input</h4>
                                <p className="text-[8px] font-black text-white">Event Hook In</p>
                              </div>
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-black" style={{ backgroundColor: result.color }} />
                            </div>

                            <div className="h-4 border-l border-dashed border-zinc-700" />

                            {/* Node 2 */}
                            <div className="w-40 bg-zinc-900 border p-1.5 rounded flex items-center gap-2 shadow-md relative" style={{ borderColor: result.color }}>
                              <div className="w-5 h-5 rounded text-black flex items-center justify-center text-[10px]" style={{ backgroundColor: result.color }}>{content.icon1}</div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[7px] font-black text-zinc-500 uppercase">{result.name} Process</h4>
                                <p className="text-[8px] font-black text-white truncate">{content.featureText}</p>
                              </div>
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-900 border border-black" />
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-black" style={{ backgroundColor: result.color }} />
                            </div>

                            <div className="h-4 border-l border-dashed border-zinc-700" />

                            {/* Node 3 */}
                            <div className="w-36 bg-zinc-900 border border-zinc-800 p-1.5 rounded flex items-center gap-2 shadow relative">
                              <div className="w-5 h-5 rounded bg-pink-500/20 text-pink-500 border border-pink-500/30 flex items-center justify-center text-[10px]">💬</div>
                              <div>
                                <h4 className="text-[7px] font-bold text-zinc-500">Output</h4>
                                <p className="text-[8px] font-black text-white">Slack Notify Log</p>
                              </div>
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-900 border border-black" />
                            </div>
                          </div>
                        </div>
                      )}

                      {result.type === "app" && (
                        <div className="w-full h-full bg-zinc-955 text-white flex items-center justify-center p-3 font-sans text-left flex-grow">
                          <div className="w-[180px] h-[260px] border-[3px] border-zinc-800 rounded-[20px] overflow-hidden bg-zinc-900 flex flex-col relative shadow-md">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-zinc-800 rounded-b-lg z-20 flex items-center justify-center" />

                            {/* Status */}
                            <div className="h-6 bg-zinc-900 flex items-end justify-between px-3 pb-0.5 select-none text-[6px] text-zinc-500 font-bold z-10 shrink-0">
                              <span>9:41</span>
                              <span>📶 🔋</span>
                            </div>

                            {/* App Header */}
                            <div className="h-8 bg-zinc-900/60 border-b border-zinc-800 flex items-center gap-1.5 px-2 z-10 shrink-0">
                              <div className="w-4.5 h-4.5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] text-zinc-400">←</div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-[8px] font-bold text-white truncate">{result.name}</h3>
                                <span className="text-[6px] text-green-500 font-semibold flex items-center gap-0.5"><span className="w-0.5 h-0.5 rounded-full bg-green-500 animate-ping" /> Online</span>
                              </div>
                            </div>

                            {/* Chat */}
                            <div className="flex-grow p-2 space-y-1.5 overflow-y-auto bg-zinc-950 text-[7px] flex flex-col justify-end font-sans">
                              <div className="max-w-[80%] bg-zinc-850 text-zinc-200 p-1.5 rounded-lg rounded-tl-none self-start leading-tight">
                                {content.bubbleQ}
                              </div>
                              <div className="max-w-[85%] p-1.5 rounded-lg rounded-tr-none text-black font-semibold shadow leading-tight self-end" style={{ backgroundColor: result.color }}>
                                {content.bubbleA}
                              </div>
                            </div>

                            {/* Input */}
                            <div className="h-8 bg-zinc-900 border-t border-zinc-800 p-1 flex items-center gap-1 shrink-0">
                              <div className="flex-grow h-full bg-zinc-950 border border-zinc-800 rounded-full px-2 flex items-center text-[6px] text-zinc-600 select-none">
                                Type message...
                              </div>
                              <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0" style={{ backgroundColor: result.color, color: '#000' }}>
                                ➔
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })() : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center my-auto px-6 py-12">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} 
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center bg-[#FFDE47] border-[3px] border-black shadow-[3px_3px_0px_#000]"
                    >
                      <Palette size={24} className="text-black stroke-[2.5px]" />
                    </motion.div>
                    <p className="font-display text-lg font-black text-zinc-100 mb-1">AWAITING ENGINE INPUT</p>
                    <p className="font-body text-[10px] text-zinc-500 font-bold max-w-[240px] mx-auto leading-relaxed">
                      Fill out the specification cards on the left panel to trigger the mockup renderer.
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
