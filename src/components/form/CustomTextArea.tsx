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
            fontWeight: "bold",
          }}
          rules={[
            {
              required: required,
              message: "This field is required",
            },
          ]}
        >
          <TextArea
            {...field}
            variant="filled"
            id={name}
            {...field}
            size="large"
            disabled={disabled}
            placeholder={`Enter ${label}`}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomTextArea;
