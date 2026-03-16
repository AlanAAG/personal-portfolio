'use client';

import { useState, useEffect, useRef } from 'react';

const CHARS = "!@#$%^&*():{};|,.<>/?";

export default function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  const [text, setText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    setIsHovering(true);
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText((prev) =>
        children
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return children[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const stopScramble = () => {
    setIsHovering(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(children);
  };

  return (
    <span
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      {text}
    </span>
  );
}
