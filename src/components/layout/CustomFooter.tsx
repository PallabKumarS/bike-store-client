import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Typography, Divider } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const CustomFooter = () => {
  const socialLinks = [
    { icon: <InstagramOutlined />, url: "" },
    { icon: <TwitterOutlined />, url: "" },
    {
      icon: <LinkedinOutlined />,
      url: "",
    },
    { icon: <GithubOutlined />, url: "" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className=" mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            <Title level={3} className="text-blue-800">
              BikeStore
            </Title>
            <Text className="text-gray-600">
              Crafting Your Perfect Ride Since 2010
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 12 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-right"
          >
            <Text className="block text-gray-600">Contact Us</Text>
            <Text className="block text-blue-800 font-semibold">
              +1 (555) 123-4567
            </Text>
            <Text className="block text-blue-800">support@bikestore.com</Text>
          </motion.div>
        </div>

        <Divider className="my-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} BikeStore. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default CustomFooter;
