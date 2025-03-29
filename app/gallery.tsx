"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  fetchImage: (imageName: string) => void;
};

export default function Gallery({ fetchImage }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="grid grid-cols-4 flex-1 w-full px-20 pt-32 overflow-auto pb-8 gap-4">
      {images.map((src, index) => (
        <div
          key={index}
          className=" aspect-[2/3] border-[0.8px] "
          onClick={() => fetchImage(src.split("/").pop() || "")}
        >
          <Image
            src={src}
            alt={`Gallery ${index}`}
            width={200}
            height={300}
            objectFit="cover"
          />
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
        </div>
      ))}
    </div>
  );
}
