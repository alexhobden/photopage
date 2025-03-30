"use client";

import { motion } from "framer-motion";
import { div } from "framer-motion/client";
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
    <div className="relative overflow-y-scroll h-full scrollbar-hide z-0 mb-8">
      <motion.div
        initial={{ y: 800 }}
        animate={{ y: 0 }}
        exit={{ y: 800 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-2 lg:grid-cols-4 flex-1 w-full px-4 lg:px-16 pt-8 lg:pt-12 mt-28 lg:mt-14   gap-6 z-20"
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{
              ease: "easeInOut",
            }}
            className=" aspect-[2/3] group "
            onClick={() => {
              setIsFlipping(true);
              fetchImage(src.split("/").pop() || "");
              setTimeout(() => {
                setIsFlipping(false);
              }, 1000); // Adjust the timeout to match your animation duration
            }}
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
              className="hidden group-hover:block border-white  w-[15%] aspect-square border-b-[0.8px] border-l-[0.8px] -bottom-2 -left-2 lg:absolute"
            />
            <motion.div
              initial={{ scale: 1 }}
              animate={isFlipping ? { scale: [1, 1.3, 1.3, 1] } : {}}
              transition={{
                times: [0, 0.1, 0.9, 1],
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="hidden group-hover:block  border-white  w-[15%] aspect-square border-t-[0.8px] border-r-[0.8px] -top-2 -right-2 lg:absolute"
            ></motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
