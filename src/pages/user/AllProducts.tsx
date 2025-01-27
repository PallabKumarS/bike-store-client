/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TQueryParams } from "@/types/global.type";
import { useState } from "react";
import { TProduct } from "@/types/product.type";
import Search from "antd/es/input/Search";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FilterForm from "@/components/form/FilterForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Button, Dropdown } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../admin/product/ProductCard";

const AllProducts = () => {
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

  const breadcrumbItems = [
    {
      title: (
        <NavLink to="/">
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      title: <NavLink to="/all-products">Products</NavLink>,
    },
  ];

  const handleFilter: SubmitHandler<FieldValues> = (data) => {
    const newParams: any[] = [];

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
  };

  const FilterDropdown = ({
    onApplyFilters,
  }: {
    onApplyFilters: SubmitHandler<FieldValues>;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
      <FilterForm onApplyFilters={onApplyFilters} />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Breadcrumb items={breadcrumbItems} />
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">
        <h1 className="text-2xl font-semibold">All Products</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Search
            className="w-full sm:w-[300px]"
            placeholder="Search products..."
            enterButton="Search"
            size="large"
            loading={isFetching}
            onSearch={(value) => {
              setParams([{ name: "searchTerm", value }]);
            }}
          />

          <div className="flex gap-4 w-full sm:w-auto">
            <Dropdown
              dropdownRender={() => (
                <FilterDropdown onApplyFilters={handleFilter} />
              )}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                size="large"
                icon={<FilterOutlined />}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                Filters
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="flex flex-wrap space-x-4 space-y-4 gap-6">
          {productsData?.data?.map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
