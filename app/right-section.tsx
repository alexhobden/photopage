"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Shuffle, LayoutGrid } from "lucide-react";
import Gallery from "./gallery";

interface Metadata {
  filename: string;
  location?: string;
  [key: string]: unknown; // For additional properties if needed
}

type Props = {
  title: string | null;
  duration?: number;
  fetchRandomImage: () => void;
  fetchImage: (imageName: string) => void;
  setIsGalleryVisible: (visible: boolean) => void;
};

export const RightSection = ({
  title,
  duration = 2,
  fetchRandomImage,
  fetchImage,
  setIsGalleryVisible,
}: Props) => {
  let titleclean = "";
  if (title) {
    titleclean = title ? title.split("/").pop()?.split(".")[0] || "" : "";
  }
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(64); // Default in px
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState(false);
  const [metadata, setMetadata] = useState<Metadata[]>([
    {
      filename: "",
      location: "",
    },
  ]); // Adjust type as needed
  const [matchedMetadata, setMatchedMetadata] = useState<Metadata | undefined>({
    filename: "",
    location: "",
  }); // Adjust type as needed

  const handleShuffleClick = () => {
    if (isShuffleDisabled) return; // Prevent double-clicks

    fetchRandomImage();
    handleResetTimer();

    setIsShuffleDisabled(true); // Disable the button
    setTimeout(() => setIsShuffleDisabled(false), 1000); // Enable after 1s
  };

  useEffect(() => {
    const newTitleArray = titleclean.split(""); // Split new title
    setDisplayText(
      Array(newTitleArray.length)
        .fill("")
        .map(() => randomChar())
    );

    const interval = 50; // Speed of flickering
    const indexesSettled: number[] = [];

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
    fetch("/meta/gallery.json")
      .then((res) => res.json())
      .then((data) => setMetadata(data));
    console.log("Metadata fetched:", metadata);

    return () => {
      clearInterval(flicker);
      clearTimeout(settleLetters);
      clearTimeout(finalize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, duration]);

  useEffect(() => {
    setMatchedMetadata(
      metadata?.find((m: Metadata) => m.filename === `${titleclean}.jpg`)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText]);

  useEffect(() => {
    if (!isPlaying) return;

    // Clear old interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new one
    intervalRef.current = setInterval(() => {
      fetchRandomImage();
    }, 7000);

    // Clear on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, resetTimer]);

  const handleResetTimer = () => {
    setResetTimer((prev) => prev + 1);
  };

  return (
    <div className="absolute lg:relative  flex flex-col justify-end items-center lg:pb-8   h-full w-full lg:w-auto flex-1 font-glasgow z-30">
      <AnimatePresence>
        {showGallery && <Gallery fetchImage={fetchImage} />}
      </AnimatePresence>
      <div className="flex gap-12 lg:pb-auto pb-4">
        <button
          onClick={() => {
            setShowGallery((prev) => !prev);
            setIsGalleryVisible(showGallery);
            handleResetTimer();
          }}
          className="group "
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative flex items-center justify-center w-14 h-14"
          >
            <motion.div className="z-10" whileTap={{ scale: 0.9 }}>
              <LayoutGrid className="text-white w-6 h-6 stroke-1.3" />
            </motion.div>
            <motion.div className="w-14 h-14 absolute group-active:scale-125 transition-transform">
              <div className="border-white h-5 w-5 border-b-[0.8px] border-l-[0.8px] bottom-0 left-0 absolute"></div>
              <div className="border-white h-5 w-5 border-t-[0.8px] border-r-[0.8px] top-0 right-0 absolute"></div>
            </motion.div>
          </motion.div>
        </button>
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="group "
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative flex items-center justify-center w-14 h-14"
          >
            <motion.div className="z-10" whileTap={{ scale: 0.9 }}>
              {isPlaying ? (
                <Pause className="text-white w-6 h-6 stroke-1.3" />
              ) : (
                <Play className="text-white w-6 h-6 stroke-1.3" />
              )}
            </motion.div>
            <motion.div className="w-14 h-14 absolute group-active:scale-125 transition-transform">
              <div className="border-white h-5 w-5 border-b-[0.8px] border-l-[0.8px] bottom-0 left-0 absolute"></div>
              <div className="border-white h-5 w-5 border-t-[0.8px] border-r-[0.8px] top-0 right-0 absolute"></div>
            </motion.div>
          </motion.div>
        </button>
        <button onClick={handleShuffleClick} className="group">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative flex items-center justify-center w-14 h-14"
          >
            {/* Shuffle Icon Centered */}
            <motion.div className="z-10" whileTap={{ scale: 0.9 }}>
              <Shuffle className="text-white w-6 h-6 stroke-1.3" />
            </motion.div>
            {/* Corner Borders */}
            <motion.div className="w-14 h-14 absolute group-active:scale-125 transition-transform">
              <div className="border-white h-5 w-5 border-b-[0.8px] border-l-[0.8px] bottom-0 left-0 absolute"></div>
              <div className="border-white h-5 w-5 border-t-[0.8px] border-r-[0.8px] top-0 right-0 absolute"></div>
            </motion.div>
          </motion.div>
        </button>
      </div>
      {/* </div> */}
      <div className="w-[90%] lg:block hidden text-right">
        <p className="text-[1em] tracking-widest uppercase opacity-90 right-1">
          {matchedMetadata?.location || "Unknown Location"}
        </p>
      </div>
      <div className="w-[90%] h-[0.8px] bg-white my-2"></div>
      <div className="w-[90%] flex items-center justify-center lg:h-24 h-14 text-center">
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
