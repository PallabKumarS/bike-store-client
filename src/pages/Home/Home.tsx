import Banner from "./Banner";
import Blogs from "./Blogs";
import Featured from "./Featured";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Banner />
      <Featured />
      <Blogs />
    </motion.div>
  );
};

export default Home;
