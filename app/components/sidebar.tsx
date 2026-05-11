import { motion } from "framer-motion";

export const Sidebar = () => {
  return (
    <div className="w-full lg:w-fit font-glasgow pl-4  pt-12 flex flex-col gap-4 items-center">
      {/* Title */}
      <div>
        <div className="relative ">
          <h1 className="lg:text-2xl font-light text-center tracking-[0.75em] pl-2">
            ALEX
          </h1>
          <h1 className="lg:text-2xl font-light text-center tracking-[0.75em] pl-2">
            HOBDEN
          </h1>
          <div className="border-white h-4 w-4 border-b-[0.8px] border-l-[0.8px] bottom-0  absolute"></div>
          <div className="border-white h-4 w-4 border-t-[0.8px] border-r-[0.8px] top-0 right-0  absolute"></div>
        </div>
        <div className="w-full border-t border-white opacity-70 my-2"></div>
        <div className="hidden text-center lg:block">
          <p className="text-xl text-center uppercase tracking-[0.75em] opacity-70 pl-2">
            PHOTOGRAPHY
          </p>
        </div>
      </div>

      {/* Menu Button */}
      <button
        onClick={() => {}}
        className=" w-full flex flex-col items-center gap-2 h-10"
      >
        <motion.div className="w-14 h-14  group-active:scale-125 flex flex-col items-center transition-transform">
          <div className="border-white h-5 w-5 border-b-[0.8px] rotate-315 border-l-[0.8px] "></div>
          {/* <div className="border-white h-5 w-5 border-b-[0.8px] rotate-315 border-l-[0.8px] "></div> */}
        </motion.div>
      </button>
    </div>
  );
};
