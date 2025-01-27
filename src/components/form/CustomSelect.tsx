import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  required?: boolean;
  disabled?: boolean;
  mode?: string;
};

const CustomSelect = ({
  label,
  name,
  options,
  required = false,
  disabled,
  mode,
}: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            <span title={label} className="text-md font-bold">
              {label}
            </span>
          }
          style={{ fontWeight: "bold", marginBottom: "10px", width: "100%" }}
          rules={[
            {
              required: required,
              message: "This field is required",
            },
          ]}
        >
          <Select
            variant="filled"
            {...field}
            mode={mode ? "multiple" : undefined}
            id={name}
            style={{ width: "100%" }}
            options={options}
            size="large"
            disabled={disabled}
            placeholder={label}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
