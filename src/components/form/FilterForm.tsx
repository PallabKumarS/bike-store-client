import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomForm from "./CustomForm";
import { Button, Col, Row, Tag } from "antd";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { categoryOptions } from "../constants/products.constants";
import { useGetAllBrandsQuery } from "@/redux/features/product/product.api";

type FilterFormProps = {
  onApplyFilters: SubmitHandler<FieldValues>;
  reset?: boolean;
};
const FilterForm = ({ onApplyFilters }: FilterFormProps) => {
  const { data: brands } = useGetAllBrandsQuery(undefined, {
    refetchOnReconnect: true,
  });

  return (
    <CustomForm onSubmit={onApplyFilters}>
      <div className="p-4 border rounded-md">
        {/* Category Field */}
        <Row gutter={16} className="mb-4">
          <Col span={12}>
            <CustomSelect
              mode="multiple"
              name="category"
              label="Category"
              options={categoryOptions}
            />
          </Col>

          {/* brand fields  */}
          <Col span={12}>
            <CustomSelect
              name="brand"
              label="Brand"
              options={brands?.data?.map((brand: string[]) => ({
                label: (
                  <Tag
                    className="text-center mx-auto w-full px-5"
                    color="yellow"
                  >
                    {brand}
                  </Tag>
                ),
                value: brand,
              }))}
            />
          </Col>
        </Row>

        {/* Price Range Fields */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Price Range</label>
          <div className="md:flex space-x-2">
            {/* min price  */}
            <CustomInput name="minPrice" label="Minimum Price" type="number" />
            {/* max price  */}
            <CustomInput name="maxPrice" label="Maximum Price" type="number" />
          </div>
        </div>

        {/* In-Stock Field */}
        <Row gutter={16} className="mb-4">
          <Col span={12}>
            <CustomSelect
              name="inStock"
              label="Availability"
              options={[
                {
                  value: "true",
                  label: (
                    <Tag
                      className="w-full px-5 text-center mx-auto"
                      color="green"
                    >
                      Available
                    </Tag>
                  ),
                },
                {
                  value: "false",
                  label: (
                    <Tag
                      className="w-full px-5 text-center mx-auto"
                      color="red"
                    >
                      Out of Stock
                    </Tag>
                  ),
                },
              ]}
            />

            {/* sort field  */}
          </Col>
          <Col span={12}>
            <CustomSelect
              label="Sort By"
              name="sort"
              options={[
                {
                  value: "-price",
                  label: (
                    <Tag
                      className="text-center mx-auto w-full px-5"
                      color="purple"
                    >
                      Price: High to Low
                    </Tag>
                  ),
                },
                {
                  value: "price",
                  label: (
                    <Tag
                      className="text-center mx-auto w-full px-5"
                      color="purple"
                    >
                      Price: Low to High
                    </Tag>
                  ),
                },
                {
                  value: "-name",
                  label: (
                    <Tag
                      className="text-center mx-auto w-full px-5"
                      color="cyan"
                    >
                      Name: Z to A
                    </Tag>
                  ),
                },
                {
                  value: "name",
                  label: (
                    <Tag
                      className="text-center mx-auto w-full px-5"
                      color="cyan"
                    >
                      Name: A to Z
                    </Tag>
                  ),
                },
              ]}
            />
          </Col>
        </Row>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </Button>
      </div>
    </CustomForm>
  );
};

export default FilterForm;
