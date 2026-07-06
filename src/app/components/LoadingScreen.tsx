import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LETTERS = "HARSHIT".split("");

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"drop" | "hold" | "shatter" | "done">("drop");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1200);
    const t2 = setTimeout(() => setPhase("shatter"), 2000);
    const t3 = setTimeout(() => { setPhase("done"); onDone(); }, 2800);
    const interval = setInterval(() => setProgress(p => Math.min(p + 3, 100)), 50);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, [onDone]);

  const getLetterAnim = (i: number) => {
    if (phase === "shatter") {
      const angle = (i / LETTERS.length) * 360 + 45;
      const dist = 500 + Math.random() * 200;
      return {
        x: Math.cos((angle * Math.PI) / 180) * dist,
        y: Math.sin((angle * Math.PI) / 180) * dist - 200,
        rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 40),
        opacity: 0,
        scale: 0.2,
      };
    }
    return { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 };
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#FFFDEC" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
        >
          {/* Halftone grid background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(black 1.5px, transparent 1.5px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Top label */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: phase === "drop" || phase === "hold" ? 1 : 0, y: 0 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 font-accent text-xs font-black tracking-[0.4em] text-black uppercase"
          >
            TRANSMISSION STARTING
          </motion.p>

          {/* Letters (Comic Display) */}
          <div className="flex items-end gap-1.5 md:gap-3 overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "120%", opacity: 0, rotate: -15 }}
                animate={
                  phase === "drop" || phase === "hold"
                    ? { y: "0%", opacity: 1, rotate: i % 2 === 0 ? 2 : -2 }
                    : getLetterAnim(i)
                }
                transition={
                  phase === "shatter"
                    ? { duration: 0.5, delay: i * 0.03, ease: [0.55, 0, 1, 0.45] }
                    : { duration: 0.5, delay: 0.1 + i * 0.06, type: "spring", stiffness: 120 }
                }
                className="block font-display text-[clamp(4.2rem,15vw,12rem)] leading-none select-none text-black"
                style={{
                  textShadow: "6px 6px 0px #000, 0px 0px 0px #000",
                  WebkitTextStroke: "4px #000000"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === "drop" || phase === "hold" ? 1 : 0, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex items-center gap-4"
          >
            <div className="h-1 w-12 bg-black" />
            <span className="font-accent text-xs tracking-[0.25em] text-black font-black uppercase">
              17-YEAR-OLD BUILDER
            </span>
            <div className="h-1 w-12 bg-black" />
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56">
            <div className="h-5 bg-white border-[3px] border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_#000] relative">
              <motion.div
                className="h-full border-r-2 border-black"
                style={{
                  background: "var(--neo-pink)",
                  width: `${progress}%`,
                }}
              />
            </div>
            <div className="mt-2.5 flex justify-between font-accent text-xs font-black text-black">
              <span>LOADING BUFFER</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Corner accents */}
          {[
            "top-6 left-6 border-t-[3px] border-l-[3px]",
            "top-6 right-6 border-t-[3px] border-r-[3px]",
            "bottom-6 left-6 border-b-[3px] border-l-[3px]",
            "bottom-6 right-6 border-b-[3px] border-r-[3px]",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`absolute w-8 h-8 border-black ${cls}`}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
