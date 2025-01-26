import { TProduct } from "@/types/product.type";
import { Card, Badge, Tooltip, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { motion } from "framer-motion";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { name, price, image, description, _id } = product;

  const handleEdit = () => {
    console.log(product);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

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
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="card-container"
    >
      <Badge.Ribbon text={`$${price}`} color="blue" className="animate-pulse">
        <Card
          hoverable
          className="w-full sm:w-[300px] overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          cover={
            <motion.div
              className="relative h-[200px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          }
          actions={[
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Tooltip title="View Details" placement="top">
                <Button
                  type="text"
                  icon={
                    <FaInfoCircle className="text-2xl text-green-500 hover:text-green-600" />
                  }
                  onClick={() => navigate(`/products/${_id}`)}
                  className="action-button"
                />
              </Tooltip>
            </motion.div>,
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Tooltip title="Edit Product" placement="top">
                <Button
                  type="text"
                  icon={
                    <CiEdit className="text-2xl text-blue-500 hover:text-blue-600" />
                  }
                  onClick={() => setShowModal(true)}
                  className="action-button"
                />
              </Tooltip>
            </motion.div>,
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Tooltip title="Delete Product" placement="top">
                <Button
                  type="text"
                  icon={
                    <MdOutlineDeleteForever className="text-2xl text-red-500 hover:text-red-600" />
                  }
                  onClick={() => handleDelete(_id)}
                  className="action-button"
                />
              </Tooltip>
            </motion.div>,
          ]}
        >
          <motion.div
            className="px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
              {name}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {description}
            </p>
          </motion.div>
        </Card>
      </Badge.Ribbon>

      {showModal && (
        <ProductModal
          isModalOpen={showModal}
          data={product}
          onCancel={() => setShowModal(false)}
          onOk={handleEdit}
        />
      )}
    </motion.div>
  );
};

export default ProductCard;
