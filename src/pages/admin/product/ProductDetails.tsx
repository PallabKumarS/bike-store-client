/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Tag, Divider, Button, Image } from "antd";
import { motion } from "framer-motion";
import { HomeOutlined, TagOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ProductModal from "./ProductModal";
import Notify from "@/components/ui/Notify";
import { TResponse } from "@/types/global.type";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const ProductDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { productId } = useParams();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  //   api hooks
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: product } = useGetSingleProductQuery(productId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !productId,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const breadcrumbItems = [
    {
      title: (
        <NavLink to="/">
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      title: (
        <NavLink
          to={user?.role === "admin" ? "/admin/products" : "/all-products"}
        >
          Products
        </NavLink>
      ),
    },
    {
      title: product?.data?.name,
    },
  ];

  //   handle edit here
  const handleEdit = async () => {
    setIsLoading(true);
    Notify({
      toastId: "1",
      type: "loading",
      message: "Updating product...",
    });

    try {
      const res = (await updateProduct({
        id: product?.data?._id,
        data: {
          name: product?.data?.name,
          price: product?.data?.price,
          image: product?.data?.image,
          description: product?.data?.description,
          brand: product?.data?.brand,
          quantity: product?.data?.quantity,
          category: product?.data?.category,
        },
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
          message: res?.error?.data?.message || "Something went wrong",
        });
      }
    } catch (err) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: "Something went wrong",
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
      console.log(res);
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
          message: res?.error?.data?.message || "Something went wrong",
        });
      }
    } catch (err) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: "Something went wrong",
      });
    }
  };

  if (!product) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* breadcrumb here  */}
      <motion.div {...fadeInUp}>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={product?.data?.image}
            alt={product?.data?.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute top-4 right-4">
            <Tag color="blue" className="text-lg px-4 py-1">
              ${product?.data?.price}
            </Tag>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product?.data?.name}
            </h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <Tag color="cyan" icon={<TagOutlined />}>
                {product?.data?.category}
              </Tag>
              <Tag color="purple">Brand: {product?.data?.brand}</Tag>
              <Tag color={product?.data?.quantity > 0 ? "success" : "error"}>
                Stock: {product?.data?.quantity}
              </Tag>
            </div>
          </div>

          <Divider />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product?.data?.description}
            </p>
          </div>

          <Divider />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Category</p>
                <p className="font-semibold">{product?.data?.category}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Brand</p>
                <p className="font-semibold">{product?.data?.brand}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Price</p>
                <p className="font-semibold">${product?.data?.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Stock</p>
                <p className="font-semibold">{product?.data?.quantity} units</p>
              </div>
            </div>
          </div>

          {user?.role === "admin" ? (
            <div className="pt-8 flex gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setShowModal(true)}
                >
                  Edit Product
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="default"
                  size="large"
                  danger
                  onClick={() => handleDelete(product?.data?._id)}
                >
                  Delete Product
                </Button>
              </motion.div>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* <NavLink to="/checkout"> */}
              <Button
                type="primary"
                size="large"
                onClick={() => navigate(`/checkout/${product?.data?._id}`)}
              >
                Buy Now
              </Button>
              {/* </NavLink> */}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* edit modal here  */}
      {user?.role === "admin" && showModal && (
        <ProductModal
          data={product?.data}
          isModalOpen={showModal}
          onCancel={() => setShowModal(false)}
          onOk={handleEdit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ProductDetails;
