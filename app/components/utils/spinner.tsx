import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <motion.div
      key="loading-icon"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-60 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="relative h-16 w-16 rounded-full border-3 border-white/80 border-t-transparent border-b-transparent animate-spin">
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-white/60 border-b-transparent border-t-transparent"
            animate={{ rotate: -360 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
}
