/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row } from "antd";
import CustomForm from "@/components/form/CustomForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import { categoryOptions } from "@/components/constants/products.constants";
import CustomTextArea from "@/components/form/CustomTextArea";
import Notify from "@/components/ui/Notify";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { TResponse } from "@/types/global.type";

const AddProduct: React.FC = () => {
  const [open, setOpen] = useState(false);

  //   api hooks
  const [createProduct] = useCreateProductMutation();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    Notify({
      toastId: "2",
      type: "loading",
      message: "Creating new product ...",
    });

    try {
      const res = (await createProduct(data)) as TResponse<any>;

      if (res?.data) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "Product added successfully!",
        });
        onClose();
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (err) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New Product
      </Button>
      <Drawer
        title="Add a New Product"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <CustomForm onSubmit={handleSubmit} reset={true}>
          <Row gutter={16}>
            {/* name of bike  */}
            <Col span={12}>
              <CustomInput name="name" label="Name of Bike" />
            </Col>
            {/* brand name */}
            <Col span={12}>
              <CustomInput name="brand" label="Brand Name" />
            </Col>
          </Row>

          {/* category */}
          <Row gutter={16}>
            <Col span={12}>
              <CustomSelect
                name="category"
                label="Category of Bike"
                options={categoryOptions}
              />
            </Col>
            {/* price */}
            <Col span={12}>
              <CustomInput name="price" label="Price" type="number" />
            </Col>
          </Row>

          <Row gutter={16}>
            {/* quantity */}
            <Col span={12}>
              <CustomInput name="quantity" label="Quantity" type="number" />
            </Col>
            {/* image url  */}
            <Col span={12}>
              <CustomInput name="image" label="Image Url" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <CustomTextArea name="description" label="Description" />
            </Col>
          </Row>
          <div className="flex justify-end gap-x-2">
            <Button onClick={onClose} danger>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </CustomForm>
      </Drawer>
    </>
  );
};

export default AddProduct;
