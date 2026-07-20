import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Loader2, 
  ChevronRight, 
  Check, 
  Palette, 
  Sparkles, 
  Code2, 
  Activity, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Copy, 
  RefreshCw, 
  Send,
  ExternalLink,
  Layers,
  Terminal
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TiltCard } from "./TiltCard";

// Presets data for 1-click concept generation
const PRESETS = [
  {
    id: "ai-copilot",
    label: "🤖 AI Copilot",
    name: "Cognitive AI Assistant",
    type: "app",
    desc: "Autonomous workflow agent trained on code schemas to execute background tasks locally.",
    color: "#ff1694", // Neo Pink
  },
  {
    id: "web3-vault",
    label: "💎 Web3 Vault",
    name: "HyperLedger Crypto Node",
    type: "crm",
    desc: "Decentralized liquidity bridges and smart contract gasless transaction telemetry.",
    color: "#38b6ff", // Neo Cyan
  },
  {
    id: "audio-engine",
    label: "🎵 Acoustic Engine",
    name: "Surround Audio Shader",
    type: "website",
    desc: "Lossless spatial audio player with 4.8ms stream latency and dynamic sound visualizers.",
    color: "#FFDE47", // Neo Yellow
  },
  {
    id: "streetwear-store",
    label: "🛍️ Cyberpunk Store",
    name: "Neo Tokyo Apparel",
    type: "ecommerce",
    desc: "Limited drop streetwear platform with instant checkout and crypto payment gateway.",
    color: "#ff3636", // Neo Red
  },
  {
    id: "logic-bot",
    label: "⚙️ Logic Node Bot",
    name: "Workflow Automation Node",
    type: "automation",
    desc: "Event-driven webhook engine chaining API node tasks with real-time Slack logs.",
    color: "#39ff14", // Neo Green
  },
];

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

const COLOR_PALETTE = ["#FFDE47", "#ff1694", "#38b6ff", "#39ff14", "#ff3636", "#9d4edd", "#ff7b00"];

// Web Audio API Synthesizer Helper
const playSynthSound = (freq = 880, type: OscillatorType = 'sine', duration = 0.1, gainValue = 0.035) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(gainValue, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silent fallback if audio context disabled
  }
};

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
  const [name, setName]               = useState("");
  const [type, setType]               = useState("");
  const [desc, setDesc]               = useState("");
  const [color, setColor]             = useState("#FFDE47"); // Default to Neo Yellow
  const [loading, setLoading]         = useState(false);
  const [logIndex, setLogIndex]       = useState(-1);
  const [result, setResult]           = useState<{ name: string; type: string; desc: string; color: string } | null>(null);

  // Interactive console states
  const [viewMode, setViewMode]       = useState<"ui" | "schema" | "telemetry">("ui");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied]           = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sub-component interactive state
  const [activeWebTab, setActiveWebTab] = useState<"features" | "pricing" | "docs">("features");
  const [cartCount, setCartCount]     = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
  const [chatInput, setChatInput]     = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const canGo = name && type && desc;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    if (soundEnabled) playSynthSound(960, "triangle", 0.08);
    setName(preset.name);
    setType(preset.type);
    setDesc(preset.desc);
    setColor(preset.color);
    showToast(`Loaded preset: ${preset.label}`);
  };

  const randomizeColor = () => {
    const nextColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    setColor(nextColor);
    if (soundEnabled) playSynthSound(1050, "sine", 0.05);
    if (result) {
      setResult({ ...result, color: nextColor });
    }
  };

  const generate = () => {
    if (!canGo || loading) return;
    if (soundEnabled) playSynthSound(750, "square", 0.15);
    setLoading(true);
    setLogIndex(0);
    setResult(null);
    setCartCount(0);
    
    // Initialize default chat message for App mockup
    const initialContent = getMockupContent(name, desc);
    setChatMessages([
      { sender: "user", text: initialContent.bubbleQ },
      { sender: "bot", text: initialContent.bubbleA }
    ]);

    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (soundEnabled) playSynthSound(600 + prev * 120, "sine", 0.06);
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
      if (soundEnabled) playSynthSound(1200, "sine", 0.25, 0.06);
      showToast("🚀 Design Schema compiled successfully!");
    }, 1500);
  };

  const handleCopySchema = () => {
    if (!result) return;
    const content = getMockupContent(result.name, result.desc);
    const schemaJSON = JSON.stringify({
      systemName: result.name,
      interfaceType: TYPE_MAP[result.type]?.label || result.type,
      themeAccent: result.color,
      protocolBadge: content.badge,
      metrics: {
        stat1: `${content.stat1Label}: ${content.stat1Val}`,
        stat2: `${content.stat2Label}: ${content.stat2Val}`,
        stat3: `${content.stat3Label}: ${content.stat3Val}`
      },
      features: TYPE_MAP[result.type]?.features || [content.featureText],
      apiEndpoint: `https://api.${result.name.toLowerCase().replace(/\s+/g, '')}.io/v1/stream`,
      status: "PRODUCTION_READY"
    }, null, 2);

    navigator.clipboard.writeText(schemaJSON);
    setCopied(true);
    if (soundEnabled) playSynthSound(1100, "sine", 0.08);
    showToast("📋 Schema JSON copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || !result) return;

    if (soundEnabled) playSynthSound(800, "sine", 0.06);
    const userText = chatInput.trim();
    setChatInput("");

    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);

    setTimeout(() => {
      if (soundEnabled) playSynthSound(1000, "triangle", 0.08);
      setChatMessages(prev => [
        ...prev, 
        { sender: "bot", text: `[${result.name} Core] Synthesized response for "${userText}". All telemetry modules are operating normally.` }
      ]);
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <section id="preview-generator" className="relative py-28 px-6 md:px-12 overflow-hidden border-b-[6px] border-black dark:border-white transition-colors duration-300">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 bg-black dark:bg-white text-white dark:text-black font-accent text-xs font-black px-4 py-3 rounded-lg border-2 border-black dark:border-white shadow-[4px_4px_0px_#FFDE47] flex items-center gap-2 pointer-events-none uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-[#FFDE47] dark:text-[#ff1694] animate-spin" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative">
        <div className="section-ghost-num right-0 top-0 text-black/5 dark:text-white/5">02</div>

        <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-10 relative z-10"
        >
          <div className="plasma-pill mb-5 w-fit font-bold uppercase border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]" style={{ background: "var(--neo-pink)", color: "#ffffff" }}>
            Interactive Engine
          </div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-[0.9] text-black dark:text-white">
            CONCEPT<br />
            <span className="bg-[#ff1694] text-white px-4 py-1.5 rotate-[-1.5deg] inline-block border-[3.5px] border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
              PREVIEW
            </span>
          </h2>
          <p className="font-body font-semibold text-black/60 dark:text-zinc-400 max-w-md text-sm leading-relaxed mt-4">
            Pick a quick preset template below or customize your project parameters to compile an interactive schema preview.
          </p>

          {/* Quick Concept Presets Bar */}
          <div className="mt-6 flex flex-wrap gap-2.5 items-center">
            <span className="font-accent text-[10px] font-black tracking-widest text-black/40 dark:text-zinc-500 uppercase mr-1 flex items-center gap-1">
              <Sparkles size={12} className="text-[#ff1694]" /> Quick Presets:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="font-accent text-[10px] font-black px-3 py-1.5 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-[#FFDE47] dark:hover:bg-[#ff1694] dark:hover:text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:scale-105 active:scale-95 transition-all duration-150 cursor-none"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          
          {/* Input Panel */}
          <TiltCard 
            className="neo-card p-6 md:p-8 space-y-6 bg-white dark:bg-zinc-900 border-[3.5px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] rounded-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-black dark:border-white">
              <div className="flex items-center gap-2">
                {["var(--neo-cyan)", "var(--neo-pink)", "var(--neo-yellow)"].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full border border-black dark:border-white" style={{ background: c }} />
                ))}
                <span className="ml-2 font-accent font-black text-[10px] tracking-widest text-black/40 dark:text-zinc-500 uppercase">
                  INPUT_SHEET
                </span>
              </div>
              <button
                onClick={randomizeColor}
                title="Randomize Theme Accent Color"
                className="flex items-center gap-1 text-[9px] font-accent font-black uppercase px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-white rounded hover:bg-[#FFDE47] dark:hover:bg-[#FFDE47] dark:hover:text-black transition-colors cursor-none"
              >
                <RefreshCw size={10} className="stroke-[2.5]" /> Theme Sync
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black dark:text-white">
                Project Title
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g. HyperLedger / Acoustic App" 
                className="w-full h-12 bg-white dark:bg-zinc-950 border-[3px] border-black dark:border-white rounded-lg px-4 font-accent text-xs text-black dark:text-white shadow-[2.5px_2.5px_0px_#000] dark:shadow-[2.5px_2.5px_0px_#fff] focus:outline-none hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] transition-all duration-150"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black dark:text-white">
                System Interface Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full h-12 bg-white dark:bg-zinc-950 border-[3px] border-black dark:border-white rounded-lg px-4 font-accent text-xs text-black dark:text-white shadow-[2.5px_2.5px_0px_#000] dark:shadow-[2.5px_2.5px_0px_#fff] focus:outline-none hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] transition-all duration-150">
                  <SelectValue placeholder="Select interface category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white font-accent text-xs">
                  {Object.entries(TYPE_MAP).map(([key, data]) => (
                    <SelectItem key={key} value={key} className="cursor-none font-bold uppercase text-black dark:text-white">
                      {data.icon} {data.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black dark:text-white">
                Operational Purpose / Description
              </label>
              <textarea 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                placeholder="Brief description of the platform's core mechanics or target features..."
                className="w-full h-24 bg-white dark:bg-zinc-950 border-[3px] border-black dark:border-white rounded-lg p-4 font-accent text-xs text-black dark:text-white shadow-[2.5px_2.5px_0px_#000] dark:shadow-[2.5px_2.5px_0px_#fff] focus:outline-none hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] transition-all duration-150 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-accent font-black text-[10px] tracking-[0.25em] uppercase text-black dark:text-white">
                Primary Neon Theme Accent
              </label>
              <div className="flex gap-3 items-center">
                <input 
                  type="color" 
                  value={color} 
                  onChange={e => setColor(e.target.value)} 
                  className="w-12 h-12 rounded-lg border-[3px] border-black dark:border-white cursor-none bg-transparent p-0" 
                />
                <input 
                  type="text" 
                  value={color} 
                  onChange={e => setColor(e.target.value)} 
                  className="flex-1 h-12 bg-white dark:bg-zinc-950 border-[3px] border-black dark:border-white rounded-lg px-4 font-accent text-sm text-black/60 dark:text-zinc-400 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] focus:outline-none hover:shadow-[3.5px_3.5px_0px_#000] dark:hover:shadow-[3.5px_3.5px_0px_#fff] transition-all duration-150" 
                />
              </div>
            </div>

            <button 
              onClick={generate} 
              disabled={!canGo || loading}
              className="w-full clay-btn justify-center font-black cursor-none"
              style={{ 
                backgroundColor: canGo ? color : "#e5e7eb",
                opacity: canGo ? 1 : 0.6 
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin stroke-[3px]" /> 
                  GENERATING SCHEMA...
                </>
              ) : (
                <>
                  <ChevronRight size={16} className="stroke-[3px]" /> 
                  COMPILE DESIGN PREVIEW
                </>
              )}
            </button>
          </TiltCard>

          {/* Output Panel (Multi-View Console) */}
          <TiltCard 
            className={`neo-card bg-[#18181b] border-[3.5px] border-black dark:border-white rounded-2xl min-h-[520px] flex flex-col overflow-hidden shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] p-0 transition-all duration-300 ${
              isFullscreen ? "fixed inset-4 z-50 max-h-none h-[calc(100vh-2rem)] min-h-0" : "relative"
            }`}
          >
            {/* Browser Header Bar */}
            <div className="h-11 bg-[#09090b] border-b-2 border-black dark:border-white flex items-center justify-between px-4 select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black/20" />
              </div>

              {/* View Switcher Tabs */}
              {result && !loading && (
                <div className="flex items-center bg-zinc-900 border border-zinc-750 rounded-lg p-0.5 font-accent text-[9px] font-black uppercase">
                  <button
                    onClick={() => { setViewMode("ui"); if (soundEnabled) playSynthSound(900, "sine", 0.04); }}
                    className={`px-2.5 py-0.5 rounded transition-all cursor-none flex items-center gap-1 ${
                      viewMode === "ui" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Layers size={10} /> Live UI
                  </button>
                  <button
                    onClick={() => { setViewMode("schema"); if (soundEnabled) playSynthSound(900, "sine", 0.04); }}
                    className={`px-2.5 py-0.5 rounded transition-all cursor-none flex items-center gap-1 ${
                      viewMode === "schema" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Code2 size={10} /> JSON Schema
                  </button>
                  <button
                    onClick={() => { setViewMode("telemetry"); if (soundEnabled) playSynthSound(900, "sine", 0.04); }}
                    className={`px-2.5 py-0.5 rounded transition-all cursor-none flex items-center gap-1 ${
                      viewMode === "telemetry" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Activity size={10} /> Telemetry
                  </button>
                </div>
              )}

              {/* Header Action Controls */}
              <div className="flex items-center gap-2">
                {result && !loading && viewMode === "schema" && (
                  <button
                    onClick={handleCopySchema}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-none"
                    title="Copy Schema JSON"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                )}

                {/* Sound SFX Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-none"
                  title={soundEnabled ? "Disable SFX" : "Enable SFX"}
                >
                  {soundEnabled ? <Volume2 size={14} className="text-[#39ff14]" /> : <VolumeX size={14} />}
                </button>

                {/* Fullscreen Expand Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-none"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>
            </div>

            {/* Live Interactive Rendering Area */}
            <div className="flex-grow bg-[#09090b] relative overflow-y-auto max-h-[500px] flex flex-col">
              {/* Retro CRT overlay filter */}
              <div className="absolute inset-0 pointer-events-none z-20 bg-crt-scanlines animate-crt-flicker" />

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading-console" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="w-full h-full p-6 flex flex-col font-mono text-[9px] text-zinc-300 gap-2.5 items-start justify-center text-left bg-[#0c0c0e] flex-grow min-h-[300px] relative"
                  >
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 w-full mb-4">
                      <Terminal size={12} className="text-[#38b6ff]" />
                      <span className="font-bold text-[8px] tracking-wider text-zinc-500 uppercase">TELEMETRY_COMPILER_CONSOLE</span>
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
                        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                        <span>COMPILING MODULE SCHEMAS...</span>
                      </div>
                    )}
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    key={result.type + viewMode} 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex flex-col flex-grow relative"
                  >
                    {/* View Mode 1: Code Schema JSON */}
                    {viewMode === "schema" && (
                      <div className="p-4 bg-[#0c0c0e] text-zinc-300 font-mono text-[9.5px] leading-relaxed overflow-x-auto select-text flex-grow">
                        <div className="flex justify-between items-center pb-2 border-b border-zinc-800 mb-3">
                          <span className="text-zinc-500 font-bold">SCHEMA_DEFINITION.json</span>
                          <span className="text-[#39ff14] text-[8px] font-bold">VALID SYNTAX</span>
                        </div>
                        <pre className="text-left font-mono">
                          <span className="text-zinc-500">&#123;</span>{"\n"}
                          {"  "}<span className="text-[#ff1694]">"projectName"</span>: <span className="text-[#FFDE47]">"{result.name}"</span>,{"\n"}
                          {"  "}<span className="text-[#ff1694]">"category"</span>: <span className="text-[#FFDE47]">"{TYPE_MAP[result.type]?.label}"</span>,{"\n"}
                          {"  "}<span className="text-[#ff1694]">"themeColor"</span>: <span className="text-[#FFDE47]">"{result.color}"</span>,{"\n"}
                          {"  "}<span className="text-[#ff1694]">"techStack"</span>: [<span className="text-cyan-400">"Next.js 15"</span>, <span className="text-cyan-400">"TypeScript"</span>, <span className="text-cyan-400">"Tailwind CSS"</span>],{"\n"}
                          {"  "}<span className="text-[#ff1694]">"features"</span>: {JSON.stringify(TYPE_MAP[result.type]?.features || [])},{"\n"}
                          {"  "}<span className="text-[#ff1694]">"apiRoutes"</span>: [<span className="text-emerald-400">"/api/v1/stream"</span>, <span className="text-emerald-400">"/api/v1/telemetry"</span>],{"\n"}
                          {"  "}<span className="text-[#ff1694]">"status"</span>: <span className="text-[#39ff14]">"DEPLOYED_EDGE_NODE"</span>{"\n"}
                          <span className="text-zinc-500">&#125;</span>
                        </pre>
                      </div>
                    )}

                    {/* View Mode 2: System Telemetry Graph */}
                    {viewMode === "telemetry" && (
                      <div className="p-5 bg-[#09090b] text-white flex flex-col space-y-4 font-mono text-[9px] flex-grow">
                        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                          <span className="font-bold text-zinc-400 uppercase">SERVER RESPONSE METRICS</span>
                          <span className="text-[#39ff14] font-bold animate-pulse">● LIVE METRICS</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg space-y-1">
                            <span className="text-zinc-500 uppercase font-bold block">SERVER LATENCY</span>
                            <div className="text-base font-black text-white">4.2ms</div>
                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 w-[85%] animate-pulse" />
                            </div>
                          </div>

                          <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg space-y-1">
                            <span className="text-zinc-500 uppercase font-bold block">ACTIVE THROUGHPUT</span>
                            <div className="text-base font-black text-white">1,480 req/s</div>
                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-400 w-[65%]" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg space-y-2">
                          <span className="text-zinc-400 font-bold uppercase block">MEMORY ALLOCATION</span>
                          <div className="flex items-center gap-1.5 h-6">
                            {[40, 65, 80, 50, 90, 70, 85, 95, 60, 75, 88, 92].map((height, i) => (
                              <div key={i} className="flex-1 bg-zinc-800 rounded-t overflow-hidden h-full flex items-end">
                                <div className="w-full rounded-t" style={{ height: `${height}%`, backgroundColor: result.color }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View Mode 3: Interactive UI Render */}
                    {viewMode === "ui" && (() => {
                      const content = getMockupContent(result.name, result.desc);
                      return (
                        <div className="w-full h-full flex flex-col flex-grow">
                          {result.type === "website" && (
                            <div className="w-full h-full bg-[#09090b] text-white flex flex-col font-sans text-left flex-grow">
                              {/* Nav */}
                              <div className="h-11 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-[#09090b]">
                                <span className="font-bold text-xs tracking-wide animate-pulse" style={{ color: result.color }}>{result.name}</span>
                                <div className="flex gap-3 text-[9px] text-zinc-400 font-semibold">
                                  <button onClick={() => { setActiveWebTab("features"); showToast("Tab: Features view"); }} className={`hover:text-white cursor-none ${activeWebTab === "features" ? "text-white underline" : ""}`}>Features</button>
                                  <button onClick={() => { setActiveWebTab("pricing"); showToast("Tab: Pricing view"); }} className={`hover:text-white cursor-none ${activeWebTab === "pricing" ? "text-white underline" : ""}`}>Pricing</button>
                                  <button onClick={() => { setActiveWebTab("docs"); showToast("Tab: Docs view"); }} className={`hover:text-white cursor-none ${activeWebTab === "docs" ? "text-white underline" : ""}`}>Docs</button>
                                </div>
                                <button 
                                  onClick={() => showToast(`🚀 Launching ${result.name} Sandbox...`)}
                                  className="text-[8px] font-bold px-2 py-0.5 rounded shadow-sm hover:scale-105 transition-transform cursor-none" 
                                  style={{ backgroundColor: result.color, color: '#000' }}
                                >
                                  Launch App
                                </button>
                              </div>
                              
                              {/* Hero / Tab Content */}
                              <div className="p-5 space-y-3.5 text-center max-w-sm mx-auto my-auto py-8">
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-400 font-semibold mx-auto uppercase tracking-wide">
                                  <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: result.color }} />
                                  {content.badge}
                                </div>
                                
                                {activeWebTab === "features" && (
                                  <>
                                    <h1 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight text-white">
                                      {content.title.split(" ").slice(0,-1).join(" ")} <span style={{ color: result.color }}>{result.name}</span>
                                    </h1>
                                    <p className="text-[10px] text-zinc-450 leading-normal font-normal">
                                      {result.desc}
                                    </p>
                                  </>
                                )}

                                {activeWebTab === "pricing" && (
                                  <div className="space-y-2">
                                    <h2 className="text-base font-bold text-white">Simple Pricing Tier</h2>
                                    <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                                      <span className="text-xl font-black text-white">$29</span><span className="text-[9px] text-zinc-500">/mo</span>
                                      <p className="text-[8px] text-zinc-400 mt-1">Unlimited compute & edge requests included.</p>
                                    </div>
                                  </div>
                                )}

                                {activeWebTab === "docs" && (
                                  <div className="space-y-2 text-left font-mono text-[8px] bg-zinc-950 p-3 rounded border border-zinc-800 text-zinc-300">
                                    <p className="text-emerald-400">$ npm install @{result.name.toLowerCase().replace(/\s+/g, '')}/sdk</p>
                                    <p className="text-zinc-500">// Initialize API client pipeline</p>
                                    <p className="text-cyan-300">const client = new Client("key_live_99");</p>
                                  </div>
                                )}

                                <div className="flex justify-center gap-2.5 pt-1">
                                  <button 
                                    onClick={() => showToast("✨ Initialized Free Trial Setup!")}
                                    className="text-[9px] font-bold px-3 py-1.5 rounded-md text-black transition-transform hover:scale-95 shadow cursor-none" 
                                    style={{ backgroundColor: result.color }}
                                  >
                                    Get Started Free
                                  </button>
                                  <button 
                                    onClick={() => showToast("📅 Demo calendar scheduled.")}
                                    className="text-[9px] font-bold px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-800 cursor-none"
                                  >
                                    Book Demo
                                  </button>
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
                                  <span className="text-[#ff1694]">Cart ({cartCount})</span>
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
                                  <button 
                                    onClick={() => {
                                      setCartCount(prev => prev + 1);
                                      if (soundEnabled) playSynthSound(1000, "sine", 0.08);
                                      showToast("🛍️ Added item to Cart!");
                                    }}
                                    className="w-full text-[9px] font-bold px-3 py-1.5 rounded-md text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 shadow cursor-none" 
                                    style={{ backgroundColor: result.color, color: "#000" }}
                                  >
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

                                <div className="h-4 w-0.5 bg-zinc-700 relative overflow-hidden">
                                  <div className="w-full h-2 rounded-full animate-node-pulse" style={{ backgroundColor: result.color }} />
                                </div>

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

                                <div className="h-4 w-0.5 bg-zinc-700 relative overflow-hidden">
                                  <div className="w-full h-2 rounded-full animate-node-pulse" style={{ backgroundColor: result.color }} />
                                </div>

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
                              <div className="w-[200px] h-[300px] border-[3px] border-zinc-800 rounded-[22px] overflow-hidden bg-zinc-900 flex flex-col relative shadow-md">
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

                                {/* Live Interactive Chat Messages */}
                                <div className="flex-grow p-2 space-y-1.5 overflow-y-auto bg-zinc-950 text-[7.5px] flex flex-col font-sans">
                                  {chatMessages.map((msg, index) => (
                                    <div
                                      key={index}
                                      className={`max-w-[85%] p-1.5 rounded-lg leading-tight ${
                                        msg.sender === "user"
                                          ? "bg-zinc-800 text-zinc-200 self-start rounded-tl-none"
                                          : "text-black font-semibold shadow self-end rounded-tr-none"
                                      }`}
                                      style={msg.sender === "bot" ? { backgroundColor: result.color } : {}}
                                    >
                                      {msg.text}
                                    </div>
                                  ))}
                                  <div ref={chatBottomRef} />
                                </div>

                                {/* Interactive Chat Input Form */}
                                <form onSubmit={handleSendChatMessage} className="h-9 bg-zinc-900 border-t border-zinc-800 p-1 flex items-center gap-1 shrink-0">
                                  <input
                                    type="text"
                                    value={chatInput}
                                    onChange={e => setChatInput(e.target.value)}
                                    placeholder="Ask AI bot..."
                                    className="flex-grow h-full bg-zinc-950 border border-zinc-800 rounded-full px-2 text-[7px] text-white focus:outline-none placeholder:text-zinc-600"
                                  />
                                  <button
                                    type="submit"
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-none"
                                    style={{ backgroundColor: result.color, color: '#000' }}
                                  >
                                    <Send size={8} />
                                  </button>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : (
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
                      Select a Quick Preset above or customize parameters on the left panel to compile a live design schema.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
