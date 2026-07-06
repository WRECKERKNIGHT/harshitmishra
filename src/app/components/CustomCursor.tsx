import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const loop = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.18;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.18;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`;
        outerRef.current.style.top = `${outerPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, select, input, textarea, [role='button']")) {
        setHovered(true);
        outerRef.current?.classList.add("hovering");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, select, input, textarea, [role='button']")) {
        setHovered(false);
        outerRef.current?.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <div 
      ref={outerRef} 
      className="cursor-outer"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease, transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), width 0.15s ease, height 0.15s ease",
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        {/* Outer scope ring */}
        <circle cx="50" cy="50" r="38" stroke="black" strokeWidth="8" fill="white" />
        {/* Scope ticks */}
        <line x1="50" y1="8" x2="50" y2="24" stroke="black" strokeWidth="8" strokeLinecap="round" />
        <line x1="50" y1="76" x2="50" y2="92" stroke="black" strokeWidth="8" strokeLinecap="round" />
        <line x1="8" y1="50" x2="24" y2="50" stroke="black" strokeWidth="8" strokeLinecap="round" />
        <line x1="76" y1="50" x2="92" y2="50" stroke="black" strokeWidth="8" strokeLinecap="round" />
        {/* Inner dot */}
        <circle 
          cx="50" 
          cy="50" 
          r="10" 
          fill={hovered ? "#FFDE47" : "#ff1694"} 
          stroke="black" 
          strokeWidth="6" 
        />
      </svg>
    </div>
  );
}
