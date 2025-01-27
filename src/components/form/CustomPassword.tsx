import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
};
export default function CustomPassword({
  name,
  label,
  required = false,
  disabled,
}: TInputProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          rules={[
            {
              required: required,
              message: "This field is required",
            },
          ]}
          label={
            <span title={label} className="text-md font-bold">
              {label}
            </span>
          }
        >
          <Input.Password
            variant="filled"
            required={required}
            {...field}
            id={name}
            size="large"
            disabled={disabled}
            placeholder={`Enter ${label}`}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
}
