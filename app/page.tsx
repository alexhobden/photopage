"use client";

import { Sidebar } from "./components/sidebar";
import { MainImage } from "./components/main-image";
import { RightSection } from "./components/right-section";
import { ParallaxBackground } from "./components/background-image";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showGallery, setShowGallery] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX / width - 0.5) * -10; // Adjust strength of parallax
    const y = (clientY / height - 0.5) * -10;

    setOffset({ x, y });
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    fetch("api/randomImage")
      .then((res) => res.json())
      .then((data) => console.log("API Response:", data));
    const res = await fetch("/api/randomImage");
    const data = await res.json();
    if (data.url) setImageSrc(data.url);
    setImageName(data.name);
  };

  const fetchImage = async (imageName: string) => {
    const res = await fetch(`/api/gallery/${imageName}`);
    const data = await res.json();
    if (data.image && data.image.url) {
      setImageSrc(data.image.url);
      setImageName(data.image.name);
    }
    console.log("Image fetched:", data);
  };

  return (
    <div
      className="relative lg:pb-0 pb-20 h-full lg:my-auto  w-screen flex lg:gap-8 flex-col lg:flex-row  text-white overflow-hidden"
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
      <MainImage imageSrc={imageSrc} isGalleryVisible={showGallery} />
      {/* Right Blurred Section */}
      <RightSection
        title={imageName}
        fetchRandomImage={fetchRandomImage}
        fetchImage={fetchImage}
        showGallery={showGallery}
        setShowGallery={setShowGallery}
      />
    </div>
  );
}
