import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
  extra?: { labelCol?: { span: number }; wrapperCol?: { span: number } };
  disabled?: boolean;
};

const CustomInput = ({ type, name, label, extra, disabled }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            <span title={label} className="form-item-label">
              {label}
            </span>
          }
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
          }}
          {...extra}
        >
          <Input
            {...field}
            variant="filled"
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
