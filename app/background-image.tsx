"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  imageSrc: string | null;
  offset: { x: number; y: number }; // Ensure x and y are numbers
};

export const ParallaxBackground = ({ imageSrc, offset }: Props) => {
  const [displayedImage, setDisplayedImage] = useState(imageSrc);

  useEffect(() => {
    if (imageSrc !== displayedImage) {
      setTimeout(() => {
        setDisplayedImage(imageSrc);
      }, 500); // Change image mid-flip
    }
  }, [imageSrc]);

  return (
    <motion.div
      key={imageSrc}
      className="absolute"
      style={{
        width: "120vw",
        height: "120vh",
        left: "-10vw",
        top: "-10vh",
        transform: `translate(${offset.x}px, ${offset.y}px)`, // ✅ Parallax effect
        transition: "transform 0.1s linear", // Smooth movement
      }}
    >
      {imageSrc && (
        <Image
          src={displayedImage || ""}
          alt="Background"
          fill
          objectFit="cover"
          className="absolute w-screen h-full object-cover pointer-events-none"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        />
      )}
      ;
    </motion.div>
  );
};
