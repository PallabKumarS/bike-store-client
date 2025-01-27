import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomForm from "./CustomForm";
import { Button } from "antd";
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
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex space-x-2">
            {/* min price  */}
            <CustomInput name="minPrice" label="Minimum Price" type="number" />
            {/* max price  */}
            <CustomInput name="maxPrice" label="Maximum Price" type="number" />
          </div>
        </div>

        {/* In-Stock Field */}
        <div className="mb-4">
          <CustomSelect
            name="inStock"
            label="In Stock"
            options={[
              { value: "true", label: "Available" },
              { value: "false", label: "Out of Stock" },
            ]}
          />
        </div>

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
