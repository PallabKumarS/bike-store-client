import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  extra?: { labelCol?: { span: number }; wrapperCol?: { span: number } };
  disabled?: boolean;
  mode?: string;
};

const CustomSelect = ({
  label,
  name,
  options,
  extra,
  disabled,
  mode,
}: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={<span className="form-item-label">{label}</span>}
          style={{ fontWeight: "bold", marginBottom: "10px" }}
          {...extra}
        >
          <Select
            {...field}
            mode={mode ? "multiple" : undefined}
            id={name}
            variant="filled"
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
