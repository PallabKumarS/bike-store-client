import ProductCard from "../admin/product/ProductCard";
import { TProduct } from "@/types/product.type";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";

const Featured = () => {
  const { data: products } = useGetAllProductsQuery(
    [{ name: "limit", value: "6" }],
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
        <p className="text-gray-600">Discover our most popular bikes</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {products?.data?.map((product: TProduct) => (
          <div key={product._id} className="w-full flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12"
      >
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/all-products")}
          className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
        >
          View All Products
        </Button>
      </motion.div>
    </div>
  );
};

export default Featured;
