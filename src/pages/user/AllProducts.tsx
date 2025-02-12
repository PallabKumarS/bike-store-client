/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TQueryParams } from "@/types/global.type";
import { useState } from "react";
import { TProduct } from "@/types/product.type";
import Search from "antd/es/input/Search";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FilterForm from "@/components/form/FilterForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Button, Dropdown, Empty, Pagination, Typography } from "antd";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../admin/product/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import AddProduct from "../admin/product/AddProduct";

const AllProducts = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const user = useAppSelector(selectCurrentUser);

  // api hooks
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([...params], {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const breadcrumbItems = [
    {
      title: (
        <NavLink to="/">
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      title: <NavLink to="/products">Products</NavLink>,
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

    if (data?.sort) {
      newParams.push({
        name: "sort",
        value: data?.sort,
      });
    }

    if (data?.brand) {
      newParams.push({
        name: "brand",
        value: data?.brand,
      });
    }

    setParams([...newParams]);
  };

  const FilterDropdown = ({
    onApplyFilters,
  }: {
    onApplyFilters: SubmitHandler<FieldValues>;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setDropdownOpen(false)}
        />
      </div>
      <FilterForm onApplyFilters={onApplyFilters} />
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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

        {/* search bar here  */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Search
            className="w-full sm:w-[300px]"
            placeholder="Search products..."
            enterButton="Search"
            allowClear
            onClear={() => setParams([{ name: "searchTerm", value: "" }])}
            size="large"
            loading={isFetching}
            onSearch={(value) => {
              setParams([{ name: "searchTerm", value }]);
            }}
          />

          {/* Filter Button */}
          <div className="flex gap-4 w-full sm:w-auto">
            <Dropdown
              open={dropdownOpen}
              onOpenChange={(open) => setDropdownOpen(open)}
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

        {user?.role === "admin" && <AddProduct />}
      </div>

      {/* Products Grid */}
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="flex flex-wrap space-x-4 space-y-4 gap-6">
          {/* Render products */}
          {productsData?.data && productsData.data.length > 0 ? (
            productsData.data.map((product: TProduct) => (
              <ProductCard key={product?._id} product={product} />
            ))
          ) : (
            <div className="mx-auto flex justify-center items-center h-screen">
              <Empty
                description={<Typography.Text>No data found.</Typography.Text>}
              />
            </div>
          )}
        </div>
      )}

      <Pagination
        className="flex justify-center items-center mt-6"
        current={productsData?.meta?.page}
        total={productsData?.meta?.totalDoc}
        pageSize={productsData?.meta?.limit}
        onChange={(newPage) => {
          const existingParams = params.filter(
            (param) => param.name !== "page"
          );
          setParams([...existingParams, { name: "page", value: newPage }]);
        }}
      />
    </div>
  );
};
export default AllProducts;
