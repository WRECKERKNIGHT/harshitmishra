import React, { useRef, useState } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  perspective?: number;
}

export function TiltCard({ 
  children, 
  className = "", 
  max = 12, 
  perspective = 800, 
  onMouseEnter, 
  onMouseLeave, 
  ...props 
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = -((y - yc) / yc) * max;
    const angleY = ((x - xc) / xc) * max;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: "transform 0.05s ease-out",
      transformStyle: "preserve-3d"
    });

    setShineStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, transparent 65%)`,
      transition: "opacity 0.1s ease"
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s ease",
      transformStyle: "preserve-3d"
    });
    setShineStyle({
      opacity: 0,
      transition: "opacity 0.5s ease"
    });
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={style}
      {...props}
    >
      <div 
        className="absolute inset-0 pointer-events-none z-30 opacity-0 transition-opacity duration-300" 
        style={shineStyle} 
      />
      {children}
    </div>
  );
}
