/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import AddProduct from "./AddProduct";
import { TQueryParams } from "@/types/global.type";
import { useState } from "react";
import { TProduct } from "@/types/product.type";
import ProductCard from "./ProductCard";
import Search from "antd/es/input/Search";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FilterForm from "@/components/form/FilterForm";
import { Button, Dropdown } from "antd";

const ProductManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // api hooks
  const { data: productsData, isFetching } = useGetAllProductsQuery(
    [...params, { name: "limit", value: limit }, { name: "page", value: page }],
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const handleFilter: SubmitHandler<FieldValues> = (data) => {
    let newParams: any[] = [];

    if (data?.category?.length > 0) {
      newParams.push({
        name: "category",
        value: data.category?.join(","),
      });
    }

    if (data?.inStock) {
      newParams.push({
        name: "inStock",
        value: data.inStock,
      });
    }

    if (data?.minPrice) {
      newParams.push({
        name: "minPrice",
        value: data.minPrice,
      });
    }

    if (data?.maxPrice) {
      newParams.push({
        name: "maxPrice",
        value: data.maxPrice,
      });
    }

    setParams([...newParams]);
    newParams = [];
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
        <h1 className="text-2xl font-semibold">All Products</h1>

        {/* search here  */}
        <Search
          style={{ width: 300 }}
          placeholder="input search text"
          enterButton="Search"
          size="large"
          loading={isFetching}
          onSearch={(value) => {
            setParams([{ name: "searchTerm", value }]);
          }}
        />

        {/* add product here  */}
        <AddProduct />
      </div>
      {/* filters here  */}
      <div className="w-96 text-center mx-auto my-5">
        <FilterForm onApplyFilters={handleFilter} />
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="md:flex space-y-3 flex-wrap gap-5 justify-center items-center">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
