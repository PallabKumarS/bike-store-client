import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomTextArea from "@/components/form/CustomTextArea";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleProductQuery } from "@/redux/features/product/product.api";
import { useAppSelector } from "@/redux/hooks";
import { Breadcrumb, Button, Col, Form, Input, Row, Tag } from "antd";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import Notify from "@/components/ui/Notify";
import { TResponse } from "@/types/global.type";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { productId } = useParams();
  const user = useAppSelector(selectCurrentUser);

  const { data: product, isFetching } = useGetSingleProductQuery(productId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !productId,
  });
  const [createOrder] = useCreateOrderMutation();

  const breadcrumbItems = [
    {
      title: (
        <NavLink to="/">
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      title: (
        <NavLink
          to={user?.role === "admin" ? "/admin/products" : "/all-products"}
        >
          Products
        </NavLink>
      ),
    },
    {
      title: (
        <NavLink
          to={
            user?.role === "admin"
              ? `/admin/products/${product?.data?._id}`
              : `/products/${product?.data?._id}`
          }
        >
          {product?.data?.name}
        </NavLink>
      ),
    },
    {
      title: "checkout",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // submit handler
  const handleOrder: SubmitHandler<FieldValues> = async (data) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Order is being placed...",
    });

    const orderData = {
      productId: product?.data?._id,
      userId: user?.userId,
      quantity: Number(data?.quantity),
      address: data?.address,
      email: user?.email,
      totalPrice: totalPrice,
    };

    console.log(orderData);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await createOrder(orderData)) as TResponse<any>;
      console.log(res);
      if (res.data) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "Order Placed",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Order Failed",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: "Order Failed",
      });
    }
  };

  if (isFetching) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto">
      {/* bread crumb here  */}
      <motion.div {...fadeInUp}>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
      </motion.div>
      <CustomForm
        onSubmit={handleOrder}
        defaultValues={{
          name: product?.data?.name,
          price: product?.data?.price,
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
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label={
                    <span className="text-md font-bold">{`Currently available: ${product?.data?.quantity}`}</span>
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
                    max={product?.data?.quantity}
                    min={1}
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
                          Number(e.target.value) * Number(product?.data?.price)
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
          <h3 className="font-medium text-end p-5 ">
            <Tag color="yellow" className="text-xl">
              Total Price: {totalPrice} $
            </Tag>
          </h3>
          <div className="flex justify-end gap-x-2">
            <Button type="primary" htmlType="submit">
              Order Now
            </Button>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default Checkout;
