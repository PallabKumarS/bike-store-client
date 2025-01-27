import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomTextArea from "@/components/form/CustomTextArea";
import { TUser } from "@/redux/features/auth/authSlice";
import { TProduct } from "@/types/product.type";
import { Button, Col, Form, Input, Modal, Row, Tag } from "antd";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

type TModalProps = {
  showModal: boolean;
  onCancel: () => void;
  user: TUser | null;
  product: TProduct;
};

const OrderModal = ({ showModal, onCancel, user, product }: TModalProps) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // submit handler
  const handleOrder: SubmitHandler<FieldValues> = (data) => {
    const orderData = {
      productId: product?._id,
      userId: user?.userId,
      quantity: Number(data?.quantity),
      address: data?.address,
      email: user?.email,
      totalPrice: totalPrice,
    };

    console.log(orderData);
  };

  return (
    <Modal
      title="Order Product"
      open={showModal}
      onCancel={onCancel}
      footer={null}
      width={{
        xs: "90%",
        sm: "85%",
        md: "80%",
        lg: "70%",
        xl: "60%",
        xxl: "50%",
      }}
    >
      <CustomForm
        onSubmit={handleOrder}
        defaultValues={{
          name: product?.name,
          price: product?.price,
          email: user?.email,
        }}
      >
        <Row gutter={16}>
          {/* name of bike  */}
          <Col span={12}>
            <CustomInput readonly={true} name="name" label="Name of Bike" />
          </Col>
          {/* price */}
          <Col span={12}>
            <CustomInput
              readonly={true}
              name="price"
              label="Price"
              type="number"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          {/* quantity */}
          <Col span={12}>
            <Controller
              name="quantity"
              rules={{
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                max: {
                  value: product?.quantity,
                  message: `Quantity must be less than or equal to ${product?.quantity}`,
                },
                validate: (value) => {
                  if (Number(value) > product?.quantity) {
                    return "Quantity exceeds available stock";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label={
                    <span className="text-md font-bold">{`Currently available: ${product?.quantity}`}</span>
                  }
                  style={{
                    marginBottom: "10px",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input
                    required={true}
                    type="number"
                    id="quantity"
                    {...field}
                    size="large"
                    placeholder={`Enter ${"Quantity"}`}
                    onChange={(e) => {
                      field.onChange(
                        e.target.value,
                        setTotalPrice(
                          Number(e.target.value) * Number(product?.price)
                        )
                      );
                    }}
                  />
                  {error && (
                    <small style={{ color: "red" }}>{error.message}</small>
                  )}
                </Form.Item>
              )}
            />
          </Col>
          {/* user email  */}
          <Col span={12}>
            <CustomInput readonly name="email" label="User Email" />
          </Col>
        </Row>

        <Row gutter={16}>
          {/* user address  */}
          <Col span={24}>
            <CustomTextArea
              required={true}
              name="address"
              label="User Address"
            />
          </Col>
        </Row>

        {/* button of form  */}
        <div className="flex flex-col justify-end gap-x-2">
          <h3 className=" text-xl font-medium text-end p-5 ">
            <Tag color="yellow">Total Price: {totalPrice} $</Tag>
          </h3>
          <div className="flex justify-end gap-x-2">
            <Button onClick={onCancel} danger>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Order Now
            </Button>
          </div>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default OrderModal;
