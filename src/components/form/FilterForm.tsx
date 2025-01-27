import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomForm from "./CustomForm";
import { Button, Col, Row } from "antd";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { categoryOptions } from "../constants/products.constants";

type FilterFormProps = {
  onApplyFilters: SubmitHandler<FieldValues>;
  reset?: boolean;
};
const FilterForm = ({ onApplyFilters }: FilterFormProps) => {
  return (
    <CustomForm onSubmit={onApplyFilters}>
      <div className="p-4 border rounded-md">
        {/* Category Field */}
        <div className="mb-4">
          <CustomSelect
            mode="multiple"
            name="category"
            label="Category"
            options={categoryOptions}
          />
        </div>

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
                { value: "true", label: "Available" },
                { value: "false", label: "Out of Stock" },
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
                  label: "Price: High to Low",
                },
                {
                  value: "price",
                  label: "Price: Low to High",
                },
                {
                  value: "-name",
                  label: "Name: Z to A",
                },
                {
                  value: "name",
                  label: "Name: A to Z",
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
