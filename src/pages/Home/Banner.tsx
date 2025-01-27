import { Carousel } from "antd";
import { motion } from "framer-motion";
import img1 from "@/assets/banner 1.avif";
import img2 from "@/assets/banner 2.avif";
import img3 from "@/assets/banner 3.avif";
import img4 from "@/assets/banner 4.avif";

const Banner = () => {
  const bannerItems = [
    {
      image: img1,
      title: "Premium Racing Bikes",
      subtitle: "Experience the thrill of speed",
    },
    {
      image: img2,
      title: "Mountain Adventures",
      subtitle: "Conquer any terrain",
    },
    {
      image: img3,
      title: "Urban Commuting",
      subtitle: "Style meets functionality",
    },
    {
      image: img4,
      title: "Electric Revolution",
      subtitle: "Eco-friendly rides for modern adventurers",
    },
  ];

  return (
    <Carousel autoplay effect="fade" className="relative">
      {bannerItems.map((item, index) => (
        <div key={index} className="relative h-[600px] w-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {item.title}
            </h1>
            <p className="text-xl md:text-2xl">{item.subtitle}</p>
          </motion.div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
