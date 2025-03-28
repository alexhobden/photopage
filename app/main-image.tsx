import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  imageSrc: string | null;
};

export const MainImage = ({ imageSrc }: Props) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }} // Grow then shrink
        transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth effect
        // className="relative lg:my-14 lg:mr-20 lg:w-auto flex-1 bg-red-500/20"
        className=" relative h-[calc(100%-112px)] aspect-[2/3]"
      >
        {imageSrc && (
          <>
            <Image
              src={imageSrc} // Make sure it's in /public
              alt="Skull"
              fill
              objectFit="contain"
            />
            <div className=""></div>
            <div className=""></div>
            <div className="hidden lg:block border-white  w-[15%] aspect-square border-b-[0.8px] border-l-[0.8px] -bottom-2 -left-2 lg:absolute"></div>
            <div className="hidden lg:block border-white  w-[15%] aspect-square border-t-[0.8px] border-r-[0.8px] -top-2 -right-2 lg:absolute"></div>
          </>
        )}
      </motion.div>
    </div>
  );
};
