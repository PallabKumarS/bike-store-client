import { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionButton = ({ children }: { children: ReactNode }) => {
  const buttonVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  return (
    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
      {children}
    </motion.div>
  );
};

export default MotionButton;
