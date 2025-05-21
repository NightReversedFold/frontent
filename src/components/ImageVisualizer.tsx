import { motion, AnimatePresence } from "framer-motion";

export default ({
  selectedImage,
  setSelected,
}: {
  selectedImage: string | null;
  setSelected: (set: string | null) => void;
}) => {
  return selectedImage ? (
    <div className="flex justify-center">
      <div
        onClick={() => {
          setSelected(null);
        }}
        className=" bg-black opacity-50 fixed top-0 left-0 w-screen h-screen z-[9999]"
      ></div>

      <motion.div
        className="m-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] size-2/4 transition-opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <img className="size-full" src={selectedImage as string} alt="" />
      </motion.div>
    </div>
  ) : null;
};
