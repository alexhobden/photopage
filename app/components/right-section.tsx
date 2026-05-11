"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Shuffle, LayoutGrid } from "lucide-react";
import Gallery from "./gallery";

type Props = {
  title: string | null;
  isMobile: boolean;
  duration?: number;
  fetchRandomImage: () => void;
  fetchImage: (imageName: string) => void;
  showGallery: boolean;
  setShowGallery: (visible: boolean) => void;
  images: { name: string; url: string }[];
};

const randomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
};

export const RightSection = ({
  title,
  isMobile,
  duration = 2,
  fetchRandomImage,
  fetchImage,
  showGallery,
  setShowGallery,
  images,
}: Props) => {
  let location = "";
  let titleclean = "";
  if (title) {
    titleclean = title
      ? title
          .split("/")
          .pop()
          ?.split(".")[0]
          .split("_")[0]
          ?.replace("-", " ") || ""
      : "";
    location = title
      ? title.split("_")[1]?.replace("-", " ") +
        ", " +
        title.split("_")[2]?.split(".")[0]?.replace("-", " ")
      : "";
  }
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(64); // Default in px
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [resetTimer, setResetTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState(false);

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
        .map(() => randomChar()),
    );

    const interval = 50; // Speed of flickering
    const indexesSettled: number[] = [];

    const flicker = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, i) =>
          indexesSettled.includes(i) ? newTitleArray[i] : randomChar(),
        ),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, duration]);

  useEffect(() => {
    console.log("IVE BEEN CALLED");
    setFontSize(64);
    const adjustFontSize = () => {
      if (!titleRef.current) return;

      let size = 64;
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
  }, [displayText, titleclean]);
  useEffect(() => {
    fetchRandomImage();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    // Clear old interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new one
    intervalRef.current = setInterval(() => {
      fetchRandomImage();
    }, 6000);

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
    <>
      {/* Gallery */}
      {/* Mobile */}
      {showGallery && isMobile && (
        <Gallery
          handleResetTimer={handleResetTimer}
          fetchImage={fetchImage}
          setShowGallery={setShowGallery}
          isMobile={isMobile}
          images={images}
        />
      )}
      {/* Container */}

      <div className=" relative lg:pt-14 min-w-0 flex flex-col overflow-x-visible lg:justify-end items-center w-full lg:pb-8 lg:pr-4  lg:h-full  lg:w-0 lg:flex-1 font-glasgow z-30">
        {/* Gallery */}
        <AnimatePresence>
          {showGallery && !isMobile && (
            <div className="h-full flex flex-col items-center relative overflow-y-scroll scrollbar-hide mb-8 w-full  py-1 ">
              <Gallery
                handleResetTimer={handleResetTimer}
                fetchImage={fetchImage}
                setShowGallery={setShowGallery}
                isMobile={isMobile}
                images={images}
              />
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ originX: 0.5 }} // Ensures the expansion starts from the middle
                className="w-[90%]    absolute  border-b-[0.8px] -bottom-0 border-white"
              ></motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className=" lg:static -top-20 lg:top-auto absolute flex gap-12 lg:pb-auto pb-4">
          {/* Gallery Toggle Button */}
          <button
            onClick={() => {
              setShowGallery(!showGallery);
              handleResetTimer();
            }}
            className="group"
          >
            {/* Casing */}
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
          {/* Play/Pause Button */}
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
              {/* Casing */}
              <motion.div className="w-14 h-14 absolute group-active:scale-125 transition-transform">
                <div className="border-white h-5 w-5 border-b-[0.8px] border-l-[0.8px] bottom-0 left-0 absolute"></div>
                <div className="border-white h-5 w-5 border-t-[0.8px] border-r-[0.8px] top-0 right-0 absolute"></div>
              </motion.div>
            </motion.div>
          </button>
          {/* Shuffle Button */}
          <button onClick={handleShuffleClick} className="group">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative flex items-center justify-center w-14 h-14"
            >
              {/* Shuffle Icon Centered */}
              <motion.div className="z-10" whileTap={{ scale: 0.9 }}>
                <Shuffle className="text-white w-6 h-6 stroke-1.3" />
              </motion.div>
              {/* Casing */}
              <motion.div className="w-14 h-14 absolute group-active:scale-125 transition-transform">
                <div className="border-white h-5 w-5 border-b-[0.8px] border-l-[0.8px] bottom-0 left-0 absolute"></div>
                <div className="border-white h-5 w-5 border-t-[0.8px] border-r-[0.8px] top-0 right-0 absolute"></div>
              </motion.div>
            </motion.div>
          </button>
        </div>

        {/* Title */}
        <div className="w-[90%]">
          {/* Location */}
          <div className="w-full lg:block hidden text-right">
            <p className="text-[1em] tracking-widest uppercase opacity-90 right-1">
              {location || "Unknown Location"}
            </p>
          </div>
          {/* Line */}
          <div className="w-full h-[0.8px] bg-white my-2"></div>

          {/* Letters */}
          <div className="w-full flex items-center justify-center lg:h-24 h-14 text-center">
            <h2
              ref={titleRef}
              className="uppercase whitespace-nowrap text-center overflow-hidden tracking-[0.75em] pl-6 pt-2"
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
                  className="whitespace-nowrap text-center"
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </div>
          {/* Casing */}
          <div className="w-full relative mb-6">
            <div className="w-6 h-4 border-l-[0.8px] absolute border-b-[0.8px] -top-2 border-white"></div>
            <div className="w-6 h-4 border-r-[0.8px] absolute right-0 border-b-[0.8px] -top-2 border-white"></div>
          </div>
        </div>
      </div>
    </>
  );
};
