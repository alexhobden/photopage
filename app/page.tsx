import Image from "next/image";
import { Sidebar } from "./sidebar";
import { Main } from "next/document";
import { MainImage } from "./main-image";
import { RightSection } from "./right-section";

export default function Home() {
  const imageSrc = "Raven";

  return (
    <div className="relative h-full  w-screen flex flex-col lg:flex-row  text-white overflow-hidden">
      {/* Fullscreen Background Image */}
      <Image
        src={`/${imageSrc}.jpg`}
        alt="Skull"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-screen h-full object-cover"
      />

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[10px]"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Image Section */}
      {/* Left Image */}
      <MainImage ImageSrc={imageSrc} />
      {/* Right Blurred Section */}
      <RightSection title={imageSrc} />
    </div>
  );
}
