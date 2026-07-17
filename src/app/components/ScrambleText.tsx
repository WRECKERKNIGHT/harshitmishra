import { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWXYZa@#$!%&*()_+{}:<>?-=[]\\;";

export function ScrambleText({ text, className = "", trigger = false }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 25);

    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span className={className}>{displayText}</span>;
}
