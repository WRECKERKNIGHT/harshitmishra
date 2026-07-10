import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Globe, Bot, ShoppingCart, Workflow, Code, Database, Check } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    icon: Globe,
    title: "Smart Websites",
    tagline: "Where design meets intelligence",
    description: "AI-powered responsive websites that adapt to visitors in real time.",
    features: ["AI-driven personalization engine", "Responsive across all devices", "SEO & Core Web Vitals optimized", "Real-time analytics dashboard", "Sub-second load times"],
    tags: ["React", "Next.js", "AI/UX", "Tailwind"],
    accent: "#38b6ff", // Neo Cyan
  },
  {
    num: "02",
    icon: Bot,
    title: "AI Integration",
    tagline: "Intelligence woven into your product",
    description: "Custom LLM integrations and search pipelines built for your systems.",
    features: ["GPT-4o & Claude API integration", "Custom fine-tuned models", "Computer vision & OCR", "Semantic search & RAG systems", "AI chatbots & assistants"],
    tags: ["GPT-4o", "LangChain", "Python", "Vector DB"],
    accent: "#ff1694", // Neo Pink
  },
  {
    num: "03",
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "Revenue engines, not storefronts",
    description: "High-conversion full-stack commerce engines engineered for scale.",
    features: ["Stripe & Razorpay integration", "Real-time inventory system", "Abandoned cart recovery", "Analytics & conversion tracking", "Multi-currency support"],
    tags: ["Shopify", "Stripe", "PostgreSQL", "Redis"],
    accent: "#52D3D8", // Neo Green
  },
  {
    num: "04",
    icon: Workflow,
    title: "Automation",
    tagline: "Work smarter, not harder",
    description: "Intelligent workflow automations that run your operations 24/7.",
    features: ["Multi-step workflow automation", "API & webhook integrations", "Scheduled task execution", "Error handling & monitoring", "Slack, email & CRM triggers"],
    tags: ["n8n", "Zapier", "Node.js", "REST APIs"],
    accent: "#FF9F66", // Neo Orange
  },
  {
    num: "05",
    icon: Code,
    title: "Custom Apps",
    tagline: "Built precisely for your problem",
    description: "Bespoke web and mobile applications built for your exact needs.",
    features: ["Cross-platform (web + mobile)", "Real-time collaboration features", "Offline-first architecture", "Role-based access control", "CI/CD pipeline setup"],
    tags: ["React Native", "Expo", "Supabase", "PWA"],
    accent: "#9d4edd", // Violet
  },
  {
    num: "06",
    icon: Database,
    title: "CRM Systems",
    tagline: "Relationships at scale",
    description: "Custom CRM systems with automated pipelines and follow-up flows.",
    features: ["Contact & deal management", "Automated follow-up sequences", "Custom pipeline stages", "BI dashboards & reporting", "Email & SMS automation"],
    tags: ["PostgreSQL", "GraphQL", "Prisma", "Chart.js"],
    accent: "#FFDE47", // Neo Yellow
  },
];

const COMIC_BURSTS = ["ZAP!", "BRAIN!", "CASH!", "BOOM!", "SHIPPED!", "SYNC!"];

export function ServicesSection() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [screenTier, setScreenTier] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Hook into target container scroll progress
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const [scrollVal, setScrollVal] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  // Handle window resizing to scale orbit system parameters responsively into 3 tiers
  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setScreenTier("mobile");
      } else if (w < 1024) {
        setScreenTier("tablet");
      } else {
        setScreenTier("desktop");
      }
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const latestScroll = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      latestScroll.current = v;
      if (!animating.current) {
        animating.current = true;
        requestAnimationFrame(() => {
          const val = latestScroll.current;
          const rotationProgress = Math.min(val * 1.15, 1);
          const raw = rotationProgress * SERVICES.length;
          const idx = Math.min(Math.floor(raw), SERVICES.length - 1);
          
          setScrollVal(val);
          setActiveIdx((prev) => (prev !== idx ? idx : prev));
          animating.current = false;
        });
      }
    });
    return unsub;
  }, [scrollYProgress]);

  // Layout configurations for mobile, tablet, and wide desktop screens
  const layout = {
    mobile: {
      orbitSize: 290,
      radius: 125,
      center: 145,
      cardLeft: "5%",
      cardTop: "320px",
      cardWidth: "90%",
      coreSize: 110,
      coreInnerSize: 80,
      ring1: 170,
      ring2: 210,
      ring3: 260,
      planetActiveSize: 56,
      planetInactiveSize: 40,
      iconActiveSize: 22,
      iconInactiveSize: 16,
      infoPillLeft: 60,
      infoPillWidth: 110,
    },
    tablet: {
      orbitSize: 430,
      radius: 185,
      center: 215,
      cardLeft: "460px",
      cardTop: "110px",
      cardWidth: "240px",
      coreSize: 152,
      coreInnerSize: 110,
      ring1: 250,
      ring2: 320,
      ring3: 390,
      planetActiveSize: 68,
      planetInactiveSize: 48,
      iconActiveSize: 28,
      iconInactiveSize: 20,
      infoPillLeft: 74,
      infoPillWidth: 125,
    },
    desktop: {
      orbitSize: 550,
      radius: 240,
      center: 275,
      cardLeft: "590px",
      cardTop: "140px",
      cardWidth: "275px",
      coreSize: 196,
      coreInnerSize: 140,
      ring1: 320,
      ring2: 410,
      ring3: 500,
      planetActiveSize: 80,
      planetInactiveSize: 56,
      iconActiveSize: 32,
      iconInactiveSize: 24,
      infoPillLeft: 86,
      infoPillWidth: 140,
    }
  }[screenTier];

  const active = SERVICES[activeIdx];
  const rotationProgress = Math.min(scrollVal * 1.15, 1);
  const orbitAngle = 270 - rotationProgress * (SERVICES.length - 1) * 60;

  // Dynamic coordinates of active planet for the pointer line
  const activeAngleRad = ((activeIdx * 60 + orbitAngle) * Math.PI) / 180;
  const planetX = layout.center + Math.cos(activeAngleRad) * layout.radius;
  const planetY = layout.center + Math.sin(activeAngleRad) * layout.radius;

  // Description Card position targets relative to orbit center Coord
  const cardTargetX = screenTier === "mobile" ? layout.center : parseFloat(layout.cardLeft);
  const cardTargetY = screenTier === "mobile" ? parseFloat(layout.cardTop) : layout.center;

  return (
    <section 
      id="services" 
      className="relative border-b-[6px] border-black transition-colors duration-500"
      style={{ backgroundColor: `${active.accent}14` }} // 8% opacity dynamic backdrop tint
    >
      
      {/* ── Sticky Scrollytelling Viewport (Extended height for smooth rotation pace) ── */}
      <div ref={storyRef} style={{ height: "400vh" }} className="relative">
        <div className="sticky-story w-full px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden">
          
          {/* ── Global Background Floating Developer Stickers/Tags (Faded on mobile, vibrant on desktop) ── */}
          <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden opacity-45 sm:opacity-90">
            
            {/* HTML5 Badge */}
            <div 
              className="absolute top-[8%] left-[4%] rotate-[-12deg] bg-[#ff4500] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "0.2s" }}
            >
              HTML5 🌐
            </div>

            {/* CSS3 Badge */}
            <div 
              className="absolute top-[48%] left-[2%] rotate-[8deg] bg-[#0025f7] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "0.7s" }}
            >
              CSS3 🎨
            </div>

            {/* React Badge */}
            <div 
              className="absolute top-[25%] left-[8%] rotate-[15deg] bg-[#00d8ff] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "1.2s" }}
            >
              REACT ⚛️
            </div>

            {/* Clean Code Sticker */}
            <div 
              className="absolute bottom-[18%] left-[3%] rotate-[-8deg] bg-[#52D3D8] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "0.5s" }}
            >
              CLEAN CODE ⭐
            </div>

            {/* No Bugs Badge */}
            <div 
              className="absolute bottom-[6%] left-[8%] rotate-[10deg] bg-[#39ff14] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "1.5s" }}
            >
              NO BUGS 🐛
            </div>

            {/* Coffee Sticker */}
            <div 
              className="absolute top-[12%] left-[45%] rotate-[-5deg] bg-[#c8a2c8] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "0.9s" }}
            >
              COFFEE ☕
            </div>

            {/* Ship It speech bubble */}
            <div 
              className="absolute top-[6%] right-[32%] rotate-[6deg] bg-[#FFDE47] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "1.8s" }}
            >
              SHIP IT! 🚀
            </div>

            {/* Node.js Badge */}
            <div 
              className="absolute top-[16%] right-[8%] rotate-[-15deg] bg-[#3c873a] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "1.1s" }}
            >
              NODE.JS 🟢
            </div>

            {/* Git Commit Sticker */}
            <div 
              className="absolute top-[58%] right-[3%] rotate-[12deg] bg-[#FF9F66] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "0.3s" }}
            >
              GIT COMMIT 💻
            </div>

            {/* Deploying Badge */}
            <div 
              className="absolute bottom-[22%] right-[5%] rotate-[-10deg] bg-[#9d4edd] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "1.6s" }}
            >
              DEPLOYING... 🌐
            </div>

            {/* 10x Dev Sticker */}
            <div 
              className="absolute bottom-[8%] right-[8%] rotate-[8deg] bg-[#ff1694] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob"
              style={{ animationDelay: "2s" }}
            >
              10X BUILDER ⚡
            </div>

            {/* Floating Emojis */}
            <span className="absolute top-[48%] left-[40%] text-3xl cartoon-bob" style={{ animationDelay: "0.6s" }}>
              💻
            </span>
            <span className="absolute bottom-[12%] left-[38%] text-3xl cartoon-bob" style={{ animationDelay: "1.4s" }}>
              👾
            </span>
            <span className="absolute top-[34%] right-[35%] text-2.5xl cartoon-bob" style={{ animationDelay: "2.1s" }}>
              💡
            </span>
            <span className="absolute bottom-[14%] right-[40%] text-3xl cartoon-bob" style={{ animationDelay: "0.8s" }}>
              🗄️
            </span>
          </div>

          {/* Section Heading aligned to the left side of the screen */}
          <div className="mb-6 select-none text-left z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
            <span className="plasma-pill mb-1.5 w-fit text-[9px] font-bold uppercase py-0.5 px-2 bg-black text-white rounded ml-0 block">
              SERVICE RADAR v1.0
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-black leading-none uppercase mt-1">
              WHAT I <span className="bg-[#ff1694] text-white px-2.5 py-0.5 inline-block border-[2px] border-black shadow-[2.5px_2.5px_0px_#000] rotate-1">BUILD</span>
            </h2>
          </div>

          {/* Center-balanced Orbit + Side Tooltip Container */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center">
            
            {/* Orbit Column (Left/Center Column) */}
            <div 
              className="relative flex flex-shrink-0 items-center justify-center select-none"
              style={{
                width: `${layout.orbitSize}px`,
                height: `${layout.orbitSize}px`
              }}
            >
              {/* Neubrutalist floating emoji stickers layer */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Rocket */}
                <span className="absolute top-[5%] left-[8%] text-3xl select-none rotate-[-15deg] filter drop-shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] cartoon-bob">
                  🚀
                </span>
                {/* Fire */}
                <span className="absolute bottom-[4%] right-[10%] text-3xl select-none rotate-[12deg] filter drop-shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] cartoon-bob" style={{ animationDelay: "0.4s" }}>
                  🔥
                </span>
                {/* Sparkles */}
                <span className="absolute top-[8%] right-[8%] text-2xl select-none rotate-[10deg] filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] cartoon-bob" style={{ animationDelay: "0.8s" }}>
                  ✨
                </span>
                {/* Lightning */}
                <span className="absolute bottom-[8%] left-[6%] text-3xl select-none rotate-[20deg] filter drop-shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] cartoon-bob" style={{ animationDelay: "1.2s" }}>
                  ⚡
                </span>
                {/* Bomb */}
                <span className="absolute top-[38%] left-[2%] text-2xl select-none rotate-[-8deg] filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] cartoon-bob" style={{ animationDelay: "1.6s" }}>
                  💣
                </span>
                {/* Crown */}
                <span className="absolute top-[44%] right-[2%] text-2.5xl select-none rotate-[15deg] filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] cartoon-bob" style={{ animationDelay: "2s" }}>
                  👑
                </span>

                {/* Colorful Neubrutalist sticker labels floating in the background */}
                <div className="absolute top-[28%] right-[2%] rotate-[-6deg] bg-[#ff1694] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob animate-pulse z-0" style={{ animationDelay: "0.5s" }}>
                  CREATIVE!
                </div>
                <div className="absolute bottom-[28%] left-[-2%] rotate-[8deg] bg-[#FFDE47] text-black border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob z-0" style={{ animationDelay: "1s" }}>
                  FUTURE-PROOF
                </div>
                <div className="absolute top-[52%] left-[10%] rotate-[12deg] bg-[#38b6ff] text-white border-2 border-black rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] cartoon-bob z-0" style={{ animationDelay: "1.5s" }}>
                  FAST ⚡
                </div>
              </div>

              {/* Dynamic colored background light halo glow */}
              <div 
                className="absolute rounded-full filter blur-[80px] opacity-20 transition-colors duration-500 z-0 pointer-events-none"
                style={{ 
                  backgroundColor: active.accent,
                  width: `${layout.orbitSize * 0.6}px`,
                  height: `${layout.orbitSize * 0.6}px`
                }} 
              />

              {/* Concentric blueprint dashed paths (Layered stacked circles) */}
              <div 
                className="absolute rounded-full border-[2.5px] border-dashed border-black/15 dark:border-white/15 pointer-events-none z-0"
                style={{ width: `${layout.ring1}px`, height: `${layout.ring1}px` }}
              />
              <div 
                className="absolute rounded-full border-[3px] border-dashed border-black/20 dark:border-white/20 pointer-events-none z-0"
                style={{ width: `${layout.ring2}px`, height: `${layout.ring2}px` }}
              />
              <div 
                className="absolute rounded-full border-[3.5px] border-dashed border-black/35 dark:border-white/35 pointer-events-none z-0 animate-[spin_55s_linear_infinite]"
                style={{ width: `${layout.ring3}px`, height: `${layout.ring3}px` }}
              />

              {/* Animated Dashed connecting SVG lines radiating from core sun to planets */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {SERVICES.map((_, idx) => {
                  const angle = (idx * 60 + orbitAngle) * (Math.PI / 180);
                  const x2 = layout.center + Math.cos(angle) * layout.radius;
                  const y2 = layout.center + Math.sin(angle) * layout.radius;
                  return (
                    <line
                      key={idx}
                      x1={layout.center}
                      y1={layout.center}
                      x2={x2}
                      y2={y2}
                      strokeWidth="2.5"
                      strokeDasharray="6,6"
                      className="transition-all duration-200 opacity-40 stroke-black dark:stroke-white"
                    />
                  );
                })}
              </svg>

              {/* Enlarged Central Core Sun (Concentric mockup circles) */}
              <div 
                className="rounded-full border-4 md:border-[5px] border-black dark:border-white flex items-center justify-center shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] z-20 relative transition-colors duration-500"
                style={{ 
                  backgroundColor: active.accent,
                  width: `${layout.coreSize}px`,
                  height: `${layout.coreSize}px`
                }}
              >
                <div 
                  className="rounded-full border-[3px] border-black dark:border-white bg-white dark:bg-zinc-850 flex flex-col items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] transition-colors duration-300"
                  style={{
                    width: `${layout.coreInnerSize}px`,
                    height: `${layout.coreInnerSize}px`
                  }}
                >
                  <span className="font-display font-black text-2xl md:text-4xl text-black dark:text-white leading-none select-none">HM!</span>
                  <span className="font-accent text-[7.5px] font-black text-white tracking-widest mt-1 uppercase bg-black dark:bg-white dark:text-black px-1.5 py-0.5 rounded border border-black dark:border-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">CORE</span>
                </div>
              </div>

              {/* Rotating spiky starburst badge behind HM core */}
              <div 
                className="absolute w-[180px] h-[180px] bg-[#ff1694]/10 border-2 border-black/5 animate-spin z-0 pointer-events-none"
                style={{ 
                  clipPath: "polygon(50% 0%, 58% 20%, 80% 10%, 75% 35%, 95% 40%, 78% 58%, 88% 80%, 65% 75%, 58% 95%, 45% 78%, 25% 88%, 30% 65%, 5% 60%, 25% 45%, 15% 20%, 38% 28%)",
                  animationDuration: "14s"
                }}
              />

              {/* Planets */}
              {SERVICES.map((serv, i) => {
                const baseAngle = i * (360 / SERVICES.length);
                const currentAngle = baseAngle + orbitAngle;
                const isActive = i === activeIdx;

                const Icon = serv.icon;

                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${currentAngle}deg) translate(${layout.radius}px) rotate(${-currentAngle}deg)`,
                      zIndex: isActive ? 30 : 10,
                    }}
                  >
                    <div className="relative">
                      
                      {/* Active Snapping Neubrutalist Tagline bubble next to the active planet */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, x: -15 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 450, damping: 14 }}
                          className="absolute bg-[#FFDE47] text-black border-2 border-black dark:border-white rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] z-40 text-left leading-snug flex flex-col select-none animate-[pulse_2.5s_infinite]"
                          style={{
                            left: `${layout.infoPillLeft}px`,
                            width: `${layout.infoPillWidth}px`
                          }}
                        >
                          <span className="text-[#ff1694] block font-black text-[8px] mb-0.5">INFO PILL:</span>
                          {serv.tagline}
                        </motion.div>
                      )}

                      {/* Planet ball */}
                      <div
                        className={`rounded-full border-[3px] border-black dark:border-white flex items-center justify-center transition-all duration-150 ${
                          isActive 
                            ? "scale-110 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]" 
                            : "scale-100 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] dark:hover:bg-zinc-700 bg-white dark:bg-zinc-800"
                        }`}
                        style={{
                          backgroundColor: isActive ? serv.accent : undefined,
                          width: `${isActive ? layout.planetActiveSize : layout.planetInactiveSize}px`,
                          height: `${isActive ? layout.planetActiveSize : layout.planetInactiveSize}px`
                        }}
                      >
                        <Icon 
                          size={isActive ? layout.iconActiveSize : layout.iconInactiveSize} 
                          className={`stroke-[2.5px] transition-all ${isActive ? "text-black" : "text-black dark:text-white"}`} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Dynamic Connected SVG Pointer Line (Draws path from active planet wrapper to description tooltip) */}
            <svg 
              className="absolute inset-0 pointer-events-none z-10 animate-pulse"
              style={{
                width: screenTier === "mobile" ? `${layout.orbitSize}px` : `${layout.orbitSize + parseFloat(layout.cardWidth)}px`,
                height: screenTier === "mobile" ? `${layout.orbitSize + 180}px` : `${layout.orbitSize}px`
              }}
            >
              <AnimatePresence>
                <motion.path
                  key={activeIdx}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  d={screenTier === "mobile"
                    ? `M ${planetX} ${planetY} C ${planetX} ${(planetY + cardTargetY)/2}, ${cardTargetX} ${(planetY + cardTargetY)/2}, ${cardTargetX} ${cardTargetY}`
                    : `M ${planetX} ${planetY} C ${(planetX + cardTargetX)/2} ${planetY}, ${(planetX + cardTargetX)/2} ${cardTargetY}, ${cardTargetX} ${cardTargetY}`
                  }
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  className="stroke-black dark:stroke-white transition-all duration-300 animate-laser-dash"
                />
              </AnimatePresence>
            </svg>

            {/* Floating Connected Side-Description Tooltip (OS window inspired popup pops next to active node) */}
            <div 
              className="absolute z-40 select-none"
              style={{
                left: layout.cardLeft,
                top: layout.cardTop,
                width: layout.cardWidth
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#FFFDEC] dark:bg-zinc-900 border-[3px] border-black dark:border-white rounded-lg shadow-[4.5px_4.5px_0px_#000] dark:shadow-[4.5px_4.5px_0px_#fff] p-4 relative overflow-hidden transition-all duration-300"
                >
                  {/* OS Titlebar inside Tooltip */}
                  <div 
                    className="border-b-2 border-black dark:border-white -mx-4 -mt-4 px-3.5 py-1.5 flex items-center justify-between mb-3.5"
                    style={{ background: active.accent }}
                  >
                    <span className="font-accent text-[8px] font-black uppercase text-black">
                      Service Details
                    </span>
                    <div className="w-4 h-4 rounded border-2 border-black dark:border-white bg-white dark:bg-zinc-800 flex items-center justify-center text-[5px] font-black text-black dark:text-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">×</div>
                  </div>

                  <h4 className="font-display text-base font-black text-black dark:text-white uppercase mb-1">
                    {active.title}
                  </h4>
                  <p className="font-body text-[11px] font-bold text-black/75 dark:text-zinc-350 leading-relaxed">
                    Learn about '{active.tagline}' and other core competencies. Detailed wins and project examples below.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {active.tags.map((t) => (
                      <span key={t} className="font-accent text-[7.5px] font-black px-1.5 py-0.5 border border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-white rounded shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          <div className="mt-8 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white rounded-lg px-4 py-1.5 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] text-center max-w-[200px] z-10 transition-all duration-300">
            <span className="font-accent text-[9px] tracking-widest text-black/45 dark:text-zinc-500 font-black uppercase block">
              ORBIT TRANSMITTER
            </span>
            <span className="font-display text-sm font-black text-black dark:text-white">
              PANEL {activeIdx + 1} / {SERVICES.length}
            </span>
          </div>

          {/* Bottom Comic Ticker Ribbon (Useful Tips & Guide to fill empty dead space) */}
          <div className="w-full bg-[#38b6ff] border-y-[2.5px] border-black dark:border-white py-1.5 overflow-hidden relative z-10 mt-auto select-none rotate-[0.5deg] shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] min-h-[32px] flex items-center transition-all duration-300">
            <div className="ticker-inner flex whitespace-nowrap gap-6 text-black font-display text-xs uppercase tracking-wider">
              <span>⚡ SCROLL DOWN TO ROTATE ORBIT • CLICK SERVICE PILLS FOR DETAILS • 17-YEAR-OLD FULL-STACK BUILDER • ⚡ SCROLL DOWN TO ROTATE ORBIT • CLICK SERVICE PILLS FOR DETAILS •</span>
              <span>⚡ SCROLL DOWN TO ROTATE ORBIT • CLICK SERVICE PILLS FOR DETAILS • 17-YEAR-OLD FULL-STACK BUILDER • ⚡ SCROLL DOWN TO ROTATE ORBIT • CLICK SERVICE PILLS FOR DETAILS •</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Standalone Features Catalog Grid Section ────────── */}
      <div className="pt-4 pb-24 px-6 md:px-12 max-w-7xl mx-auto border-t-4 border-black dark:border-white relative z-10">
        <div className="mb-14 text-center">
          <div className="plasma-pill mb-5 w-fit uppercase font-bold mx-auto border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]" style={{ background: "var(--neo-pink)", color: "#fff" }}>
            Specifications Catalog
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-black text-black dark:text-white select-none">
            SERVICE DETAILS &amp; WINS
          </h3>
          <p className="font-body text-xs font-semibold text-black/60 dark:text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
            A comprehensive list of deliverables and platform structures included under each service panel.
          </p>
        </div>

        {/* 6-Card Neubrutalist Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((serv, i) => {
            const Icon = serv.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="neo-card p-6 flex flex-col justify-between bg-white dark:bg-zinc-900 text-left select-none transition-colors duration-300"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 1}deg)`,
                }}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center border-2 border-black dark:border-white shadow-[1.5px_1.5px_0px_#000] dark:shadow-[1.5px_1.5px_0px_#fff]"
                        style={{ background: serv.accent }}
                      >
                        <Icon size={16} className="text-black stroke-[2.5px]" />
                      </div>
                      <h4 className="font-display text-lg font-black text-black dark:text-white">{serv.title}</h4>
                    </div>
                    <span className="font-display text-xl font-black text-black/25 dark:text-white/20">{serv.num}</span>
                  </div>

                  {/* Tagline */}
                  <p className="font-accent text-[10px] tracking-wider font-black uppercase mb-3" style={{ color: serv.accent }}>
                    {serv.tagline}
                  </p>

                  {/* Feature Checklist wins */}
                  <div className="space-y-2.5 mb-6">
                    {serv.features.map((feat, fi) => (
                      <div key={fi} className="flex items-start gap-2.5">
                        <div
                          className="w-4.5 h-4.5 rounded border-2 border-black dark:border-white flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff] mt-0.5"
                          style={{ background: serv.accent }}
                        >
                          <Check size={10} className="stroke-[3.5px] text-black" />
                        </div>
                        <span className="font-body text-[11px] font-bold text-black/85 dark:text-zinc-300 leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-black/5 dark:border-white/5">
                  {serv.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="font-accent text-[9px] font-extrabold tracking-wider px-2 py-0.5 bg-black/5 dark:bg-zinc-800 border border-black dark:border-white rounded text-black/75 dark:text-zinc-300 shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
