import { useEffect, useState } from "react";

export function DotShader() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get normalized coordinates (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setCoords({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Hand-drawn comic style floating elements (Parallax) */}
      <div 
        className="absolute top-[20%] left-[10%] w-16 h-16 transition-transform duration-700 ease-out hidden md:block"
        style={{ transform: `translate(${coords.x * 24}px, ${coords.y * 24}px) rotate(-10deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#ff1694] stroke-black stroke-[6px]">
          {/* Star shape */}
          <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" />
        </svg>
      </div>

      <div 
        className="absolute top-[65%] right-[12%] w-24 h-24 transition-transform duration-1000 ease-out hidden md:block"
        style={{ transform: `translate(${coords.x * -35}px, ${coords.y * -35}px) rotate(15deg)` }}
      >
        {/* Cartoon Cloud / Boom outline */}
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FFDE47] stroke-black stroke-[6px]">
          <path d="M20,50 Q10,35 30,30 Q45,15 65,30 Q85,25 80,48 Q95,65 75,75 Q60,90 40,80 Q10,85 20,50 Z" />
        </svg>
      </div>

      <div 
        className="absolute bottom-[15%] left-[15%] w-12 h-12 transition-transform duration-500 ease-out hidden md:block"
        style={{ transform: `translate(${coords.x * 40}px, ${coords.y * 15}px)` }}
      >
        {/* Simple pop-art target ring */}
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-black stroke-[8px]">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="20" className="fill-[#38b6ff]" />
        </svg>
      </div>

      <div 
        className="absolute top-[12%] right-[25%] w-14 h-14 transition-transform duration-800 ease-out hidden md:block"
        style={{ transform: `translate(${coords.x * -18}px, ${coords.y * 22}px) rotate(-5deg)` }}
      >
        {/* Cartoon exclamation spark */}
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#ff1694] stroke-black stroke-[6px]">
          <polygon points="50,5 60,40 95,50 60,60 50,95 40,60 5,50 40,40" />
        </svg>
      </div>

      {/* Screen halftone overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none" />
    </div>
  );
}
