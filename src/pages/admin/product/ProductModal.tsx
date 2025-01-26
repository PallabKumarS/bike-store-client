import { categoryOptions } from "@/components/constants/products.constants";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import CustomTextArea from "@/components/form/CustomTextArea";
import { TProduct } from "@/types/product.type";
import { Button, Col, Modal, Row } from "antd";

type ProductModalProps = {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  data: TProduct;
};

const ProductModal = ({
  isModalOpen,
  onOk,
  onCancel,
  data,
}: ProductModalProps) => {
  return (
    <Modal
      title="Edit Product"
      open={isModalOpen}
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
      <CustomForm onSubmit={onOk} defaultValues={data}>
        <Row gutter={16}>
          {/* name of bicycle  */}
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

        {/* button of form  */}
        <div className="flex justify-end gap-x-2">
          <Button onClick={onCancel} danger>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default ProductModal;
