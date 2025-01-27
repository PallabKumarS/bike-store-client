import { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionCard = ({ children }: { children: ReactNode }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="card-container"
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
