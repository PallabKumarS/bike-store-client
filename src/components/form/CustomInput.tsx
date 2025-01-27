import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

const CustomInput = ({
  type,
  name,
  label,
  required = false,
  disabled,
  readonly = false,
}: TInputProps) => {
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
          style={{
            marginBottom: "10px",
          }}
          rules={[
            {
              required: required,
              message: "This field is required",
            },
          ]}
        >
          <Input
            readOnly={readonly}
            {...field}
            type={type}
            id={name}
            {...field}
            size="large"
            disabled={disabled}
            placeholder={`Enter ${label}`}
            onChange={(e) => {
              field.onChange(
                type === "number" ? Number(e.target.value) : e.target.value
              );
            }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomInput;
