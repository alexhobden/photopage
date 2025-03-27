"use client";

import Image from "next/image";

type Props = {
  imageSrc: string;
  offset: { x: number; y: number }; // Ensure x and y are numbers
};

export const ParallaxBackground = ({ imageSrc, offset }: Props) => {
  return (
    <div
      className="absolute"
      style={{
        width: "120vw", // ✅ 120% width of viewport
        height: "120vh", // ✅ 120% height of viewport
        left: "-10vw", // ✅ Centering trick
        top: "-10vh",
        transform: `translate(${offset.x}px, ${offset.y}px)`, // ✅ Parallax effect
        transition: "transform 0.1s linear", // Smooth movement
      }}
    >
      <Image
        src={`/${imageSrc}.jpg`}
        alt="Background"
        fill
        objectFit="cover"
        className="absolute w-screen h-full object-cover pointer-events-none"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      />
    </div>
  );
};
