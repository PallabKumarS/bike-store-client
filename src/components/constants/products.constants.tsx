import { Tag } from "antd";

const bikeCategory = ["Mountain", "Hybrid", "Electric", "Sport"];

export const categoryOptions = bikeCategory.map((item) => ({
  label: (
    <Tag className="w-full px-5 text-center mx-auto" color="blue">
      {item}
    </Tag>
  ),
  value: item,
}));
