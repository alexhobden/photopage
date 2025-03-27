import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  imageSrc: string | null;
};

export const MainImage = ({ imageSrc }: Props) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }} // Grow then shrink
      transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth effect
      className="relative w-full lg:w-auto flex-1"
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc} // Make sure it's in /public
            alt="Skull"
            fill
            objectFit="contain"
            className="lg:py-14 lg:pr-20"
          />
          <div className="hidden lg:block border-white h-20 w-20 border-b-[0.8px] border-l-[0.8px] bottom-12 left-16  lg:absolute"></div>
          <div className="hidden lg:block border-white h-20 w-20 border-t-[0.8px] border-r-[0.8px] top-12 right-36  lg:absolute"></div>
        </>
      )}
      ;
    </motion.div>
  );
};
