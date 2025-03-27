"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";

type Props = {
  title: string | null;
  duration?: number;
  fetchRandomImage: () => void;
};

export const RightSection = ({
  title,
  duration = 2,
  fetchRandomImage,
}: Props) => {
  let titleclean = "";
  if (title) {
    titleclean = title ? title.split("/").pop()?.split(".")[0] || "" : "";
  }
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(64); // Default in px
  const [displayText, setDisplayText] = useState<string[]>([]);

  useEffect(() => {
    let newTitleArray = titleclean.split(""); // Split new title
    setDisplayText(
      Array(newTitleArray.length)
        .fill("")
        .map(() => randomChar())
    );

    const interval = 50; // Speed of flickering
    let indexesSettled: number[] = [];

    const flicker = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, i) =>
          indexesSettled.includes(i) ? newTitleArray[i] : randomChar()
        )
      );
    }, interval);

    const settleLetters = setTimeout(() => {
      let delay = 0;
      newTitleArray.forEach((_, i) => {
        setTimeout(() => {
          indexesSettled.push(i);
        }, delay);
        delay += (duration * 1000) / newTitleArray.length;
      });
    }, 500);

    const finalize = setTimeout(() => {
      setDisplayText(newTitleArray);
      clearInterval(flicker);
    }, duration * 1000);

    return () => {
      clearInterval(flicker);
      clearTimeout(settleLetters);
      clearTimeout(finalize);
    };
  }, [title, duration]); // 🔥 Now it resets properly when `title` changes!

  useEffect(() => {
    setFontSize(64);
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
  }, [displayText]);

  return (
    <div className="absolute lg:relative flex flex-col justify-end items-center lg:pb-8 lg:-left-12  h-full w-full lg:w-auto flex-1  font-glasgow">
      {/* <div className="w-[90%] flex flex-1 items-center justify-end"> */}
      <button onClick={fetchRandomImage} className="">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative flex items-center justify-center w-14 h-14"
        >
          {/* Shuffle Icon Centered */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="z-10"
            whileTap={{ scale: 0.9 }}
          >
            <Shuffle className="text-white w-6 h-6 stroke-1.3" />
          </motion.div>
          {/* Corner Borders */}
          <motion.div
            className="w-14 h-14 absolute"
            whileHover={{ scale: 1.2 }}
          >
            <div className="border-white h-5 w-5 border-b-[0.8px] border-l-[0.8px] bottom-0 left-0 absolute"></div>
            <div className="border-white h-5 w-5 border-t-[0.8px] border-r-[0.8px] top-0 right-0 absolute"></div>
          </motion.div>
        </motion.div>
      </button>
      {/* </div> */}
      <div className="w-[90%] text-right">
        <p className="text-[1em] tracking-widest opacity-90 right-1">
          DUISBURG
        </p>
      </div>
      <div className="w-[90%] h-[0.8px] bg-white my-2"></div>
      <div className="w-[90%] flex items-center justify-center lg:h-24 text-center">
        <h2
          ref={titleRef}
          className="uppercase text-center overflow-hidden tracking-[0.75em] pt-2"
          style={{ fontSize: `${fontSize}px` }}
        >
          {displayText.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (i * duration) / titleclean.length,
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
