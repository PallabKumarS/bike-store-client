/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "@/types/product.type";
import { Card, Badge, Tooltip, Button, Tag, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { motion } from "framer-motion";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import Notify from "@/components/ui/Notify";
import { TResponse } from "@/types/global.type";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import MotionCard from "@/components/ui/MotionCard";
import MotionButton from "@/components/ui/MotionButton";
import { FieldValues, SubmitHandler } from "react-hook-form";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  //   api hooks
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const { name, price, image, description, _id, brand, quantity, category } =
    product;

  //   handle edit here
  const handleEdit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    Notify({
      toastId: "1",
      type: "loading",
      message: "Updating product...",
    });

    try {
      const res = (await updateProduct({
        id: _id,
        data,
      })) as TResponse<any>;

      if (res?.data?.success) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "Product updated successfully",
        });
        setShowModal(false);
        setIsLoading(false);
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (err: any) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: err?.data?.message || "An error occurred",
      });
    }
  };

  // handle delete here
  const handleDelete = async (id: string) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Deleting product...",
    });

    try {
      const res = (await deleteProduct(id)) as TResponse<any>;
      if (res?.data?.success) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "Product deleted successfully",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (err: any) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: err?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <MotionCard>
      {/* badge with price here  */}
      <Badge.Ribbon text={`$${price}`} color="blue" className="animate-pulse">
        <Card
          hoverable
          className="w-[260px] md:w-[300px] overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto"
          cover={
            <motion.div
              className="relative h-[200px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* image here  */}
              <Image
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          }
          //    card actions here
          actions={[
            <MotionButton>
              {/* view details button  */}
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
            </MotionButton>,

            // edit button here
            ...(user?.role === "admin"
              ? [
                  <MotionButton key="edit">
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
                  </MotionButton>,
                  <MotionButton key="delete">
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
                  </MotionButton>,
                ]
              : []),
          ]}
        >
          {/* name and description here  */}
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

          <motion.div
            className="px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Tag color="blue" className="flex items-center gap-1">
                  <span className="font-medium">Brand:</span> {brand}
                </Tag>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Tag color="green" className="flex items-center gap-1">
                  <span className="font-medium">Category:</span> {category}
                </Tag>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Tag
                  color={quantity > 0 ? "gold" : "red"}
                  className="flex items-center gap-1"
                >
                  <span className="font-medium">
                    {quantity > 0 ? "Stock:" : "Out Of Stock"}
                  </span>
                  {quantity > 0 && quantity}
                </Tag>
              </motion.div>
            </div>
          </motion.div>
        </Card>
      </Badge.Ribbon>

      {/* edit modal here  */}
      {user?.role === "admin" && showModal && (
        <ProductModal
          isLoading={isLoading}
          isModalOpen={showModal}
          data={product}
          onCancel={() => setShowModal(false)}
          onOk={handleEdit}
        />
      )}
    </MotionCard>
  );
};

export default ProductCard;
