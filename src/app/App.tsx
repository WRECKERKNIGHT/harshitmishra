import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PreviewGenerator } from "./components/PreviewGenerator";
import { ExperienceSection } from "./components/ExperienceSection";
import { TheArsenal } from "./components/TheArsenal";
import { ContactSection } from "./components/ContactSection";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: "100%" }}
    />
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen overflow-x-clip transition-colors duration-300">

      {/* Comic Halftone background */}
      <div className="global-bg" />

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <HeroSection />
          <ServicesSection />
          <PreviewGenerator />
          <ExperienceSection />
          <TheArsenal />
          <ContactSection />
        </motion.div>
      )}
    </div>
  );
}
