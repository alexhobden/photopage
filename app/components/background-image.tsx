"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  imageSrc: string | null;
  offset: { x: number; y: number };
};

export const ParallaxBackground = ({ imageSrc, offset }: Props) => {
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(imageSrc);

  useEffect(() => {
    if (imageSrc && imageSrc !== currentImage) {
      setPrevImage(currentImage); // Store previous image
      setCurrentImage(imageSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        width: "120vw",
        height: "120vh",
        left: "-10vw",
        top: "-10vh",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.1s linear",
      }}
    >
      {/* AnimatePresence to handle old image fading out */}
      <AnimatePresence mode="wait">
        {prevImage && (
          <motion.div
            key={prevImage} // Track previous image
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // Smooth fade out
            className="absolute w-full h-full"
          >
            <Image
              src={prevImage}
              alt="Previous Background"
              fill
              objectFit="cover"
              className="w-full h-full object-cover pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {/* New Image fades in smoothly */}
        {currentImage && (
          <motion.div
            key={currentImage} // Track new image
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }} // Smooth fade in
            className="absolute w-full h-full"
          >
            <Image
              src={currentImage}
              alt="Current Background"
              fill
              objectFit="cover"
              className="w-full h-full object-cover pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
