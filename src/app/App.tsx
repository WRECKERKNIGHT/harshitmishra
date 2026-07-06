import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PreviewGenerator } from "./components/PreviewGenerator";
import { ExperienceSection } from "./components/ExperienceSection";
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

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "#FFFDEC" }}>
      <CustomCursor />

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
          <Navbar />
          <HeroSection />
          <ServicesSection />
          <PreviewGenerator />
          <ExperienceSection />
          <ContactSection />
        </motion.div>
      )}
    </div>
  );
}
