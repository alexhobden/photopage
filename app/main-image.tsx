"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  imageSrc: string | null;
};

export const MainImage = ({ imageSrc }: Props) => {
  const [displayedImage, setDisplayedImage] = useState(imageSrc);
  const [isFlipping, setIsFlipping] = useState(false); // Track animation state

  useEffect(() => {
    if (imageSrc !== displayedImage) {
      setIsFlipping(true); // Start animation
      setTimeout(() => {
        setDisplayedImage(imageSrc);
        setIsFlipping(false); // Reset after animation
      }, 500); // Change image mid-flip
    }
    console.log("Image changed:", imageSrc);
  }, [imageSrc]);

  useEffect(() => {
    if (imageSrc !== displayedImage) {
      setTimeout(() => setDisplayedImage(imageSrc), 500); // Change image mid-flip
    }
  }, [imageSrc]);

  return (
    <div className="h-full flex flex-col justify-center">
      <motion.div
        // Smooth effect
        className=" relative h-[calc(100%-112px)] aspect-[2/3]"
      >
        {imageSrc && (
          <>
            <motion.div
              key={imageSrc}
              initial={{ scale: 1, rotateY: 0, skewY: 0 }}
              animate={{
                rotateY: [0, 90, 0],
                skewY: [0, 10, 0],
              }} // Grow then shrink
              transition={{ duration: 1, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={displayedImage || ""} // Ensure src is always a valid string
                alt="Skull"
                fill
                objectFit="contain"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              animate={isFlipping ? { scale: [1, 1.3, 1.3, 1] } : {}}
              transition={{
                times: [0, 0.1, 1, 1],
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="hidden lg:block border-white w-[15%] aspect-square border-b-[0.8px] border-l-[0.8px] -bottom-2 -left-2 lg:absolute"
            />
            <motion.div
              initial={{ scale: 1 }}
              animate={isFlipping ? { scale: [1, 1.3, 1.3, 1] } : {}}
              transition={{
                times: [0, 0.1, 0.9, 1],
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="hidden lg:block border-white  w-[15%] aspect-square border-t-[0.8px] border-r-[0.8px] -top-2 -right-2 lg:absolute"
            ></motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};
