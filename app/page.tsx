"use client";

import { Sidebar } from "./components/sidebar";
import { MainImage } from "./components/main-image";
import { RightSection } from "./components/right-section";
import { ParallaxBackground } from "./components/background-image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Spinner from "./components/utils/spinner";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [showLoadingIcon, setShowLoadingIcon] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX / width - 0.5) * -15; // Adjust strength of parallax
    const y = (clientY / height - 0.5) * -15;

    setOffset({ x, y });
  };

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024); // Tailwind's lg is 1024px
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);
    return isMobile;
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    const loadGallery = async () => {
      const res = await fetch("/api/gallery");
      const data: { name: string; url: string }[] = await res.json();

      const preloadedImages: { name: string; url: string }[] = [];
      setImages(preloadedImages); // Start with empty array

      for (const image of data) {
        try {
          const imgRes = await fetch(image.url);
          const blob = await imgRes.blob();
          const objectURL = URL.createObjectURL(blob);
          const newImage = { name: image.name, url: objectURL };
          preloadedImages.push(newImage);
          setImages([...preloadedImages]); // Update state progressively
          if (preloadedImages.length === 1) {
            fetchRandomImage(preloadedImages);
          }
        } catch (error) {
          console.error(`Failed to preload ${image.name}:`, error);
          // Fallback to original URL if preload fails
          preloadedImages.push(image);
          setImages([...preloadedImages]);
        }
      }
    };

    loadGallery();
  }, []);

  const fetchRandomImage = (
    galleryImages?: { name: string; url: string }[],
  ) => {
    const imgs = galleryImages || images;
    if (imgs.length === 0) return;
    const randomImage = imgs[Math.floor(Math.random() * imgs.length)];
    setImageSrc(randomImage.url);
    setImageName(randomImage.name);
  };

  const handleImageLoaded = () => {
    if (!isFirstImageLoaded) {
      setIsFirstImageLoaded(true);
      setShowLoadingIcon(false);
      setTimeout(() => setShowLoadingScreen(false), 200);
    }
  };

  const fetchImage = (imageName: string) => {
    const image = images.find((img) => img.name === imageName);
    if (image) {
      setImageSrc(image.url);
      setImageName(image.name);
    }
  };

  return (
    <>
      {isMobile ? (
        // Mobile view with gallery on top
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
          <MainImage
            imageSrc={imageSrc}
            isGalleryVisible={showGallery}
            onImageLoad={handleImageLoaded}
          />
          {/* Right Section */}
          <RightSection
            title={imageName}
            isMobile={isMobile}
            fetchRandomImage={() => fetchRandomImage()}
            fetchImage={fetchImage}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
            images={images}
          />
        </div>
      ) : (
        // Desktop Layout
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
          <MainImage
            imageSrc={imageSrc}
            isGalleryVisible={showGallery}
            onImageLoad={handleImageLoaded}
          />
          {/* Right Section */}
          <RightSection
            title={imageName}
            isMobile={isMobile}
            fetchRandomImage={() => fetchRandomImage()}
            fetchImage={fetchImage}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
            images={images}
          />
        </div>
      )}
      <AnimatePresence>
        {showLoadingScreen && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{showLoadingIcon && <Spinner />}</AnimatePresence>
    </>
  );
}
