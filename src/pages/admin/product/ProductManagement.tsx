/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import AddProduct from "./AddProduct";
import { TQueryParams } from "@/types/global.type";
import { useState } from "react";
import { TProduct } from "@/types/product.type";
import ProductCard from "./ProductCard";

const ProductManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  // api hooks
  const { data: productsData, isFetching } = useGetAllProductsQuery(
    [
      ...params,
      { name: "limit", value: limit },
      { name: "page", value: page },
      { name: "searchTerm", value: searchTerm },
    ],
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
        <h1 className="text-2xl font-semibold ">All Products</h1>

        <AddProduct />
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
