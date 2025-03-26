"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  duration?: number;
};

export const RightSection = ({ title, duration = 2 }: Props) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(64); // Default in px
  const [displayText, setDisplayText] = useState(
    title.split("").map(() => randomChar())
  );

  useEffect(() => {
    const interval = 50; // Speed of flickering
    let currentText = title.split("");
    let indexesSettled: number[] = [];

    const flicker = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, i) =>
          indexesSettled.includes(i) ? currentText[i] : randomChar()
        )
      );
    }, interval);

    const settleLetters = setTimeout(() => {
      let delay = 0;
      currentText.forEach((_, i) => {
        setTimeout(() => {
          indexesSettled.push(i);
        }, delay);
        delay += (duration * 1000) / currentText.length;
      });
    }, 500);

    const finalize = setTimeout(() => {
      setDisplayText(currentText);
      clearInterval(flicker);
    }, duration * 1000);

    return () => {
      clearInterval(flicker);
      clearTimeout(settleLetters);
      clearTimeout(finalize);
    };
  }, [title, duration]);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!titleRef.current) return;

      let size = fontSize;
      const element = titleRef.current;
      element.style.fontSize = `${size}px`; // Apply initial size

      while (element.scrollWidth > element.clientWidth && size > 12) {
        size -= 2; // Reduce font size step by step
        element.style.fontSize = `${size}px`;
      }

      setFontSize(size); // Save final size
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [title]);
  return (
    <div className="absolute lg:relative flex flex-col justify-end items-center lg:pb-8 lg:-left-12  h-full w-full lg:w-auto flex-1  font-glasgow">
      <div className="w-[90%] text-right">
        <p className="text-[1em] tracking-widest opacity-90 right-1">
          DUISBURG
        </p>
      </div>
      <div className="w-[90%] h-[0.8px] bg-white my-2"></div>
      <div className="w-[90%] lg:24 text-center">
        <h2
          ref={titleRef}
          className=" uppercase justify-center overflow-hidden tracking-[0.75em] pt-2"
          style={{ fontSize: `${fontSize}px` }}
        >
          {displayText.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (i * duration) / title.length,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </div>
      <div className="w-[90%] relative mb-6">
        <div className="w-6 h-4 border-l-[0.8px] absolute border-b-[0.8px] -top-2 border-white"></div>
        <div className="w-6 h-4 border-r-[0.8px] absolute right-0 border-b-[0.8px] -top-2 border-white"></div>
      </div>
    </div>
  );
};

const randomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
};
