import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

const CustomTextArea = ({
  name,
  label,
  required = false,
  disabled,
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
          <TextArea
            variant="filled"
            required={required}
            {...field}
            id={name}
            {...field}
            size="large"
            disabled={disabled}
            placeholder={`Enter ${label}`}
            allowClear
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomTextArea;
