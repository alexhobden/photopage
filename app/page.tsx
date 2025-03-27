"use client";

import Image from "next/image";
import { Sidebar } from "./sidebar";
import { Main } from "next/document";
import { MainImage } from "./main-image";
import { RightSection } from "./right-section";
import { ParallaxBackground } from "./background-image";
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX / width - 0.5) * -10; // Adjust strength of parallax
    const y = (clientY / height - 0.5) * -10;

    setOffset({ x, y });
  };

  const fetchRandomImage = async () => {
    fetch("api/randomImage")
      .then((res) => res.json())
      .then((data) => console.log("API Response:", data));
    const res = await fetch("/api/randomImage");
    const data = await res.json();
    if (data.image) setImageSrc(data.image);
  };

  return (
    <div
      className="relative h-full  w-screen flex flex-col lg:flex-row  text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Fullscreen Background Image */}
      <ParallaxBackground imageSrc={imageSrc} offset={offset} />

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[10px]"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Image Section */}
      {/* Left Image */}
      <MainImage imageSrc={imageSrc} />
      {/* Right Blurred Section */}
      <RightSection title={imageSrc} fetchRandomImage={fetchRandomImage} />
    </div>
  );
}
