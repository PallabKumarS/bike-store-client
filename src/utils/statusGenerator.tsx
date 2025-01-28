import { Tag } from "antd";

export type TStatus =
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "processing";

interface StatusConfig {
  [key: string]: {
    color: string;
    label: string;
  };
}

const statusConfig: StatusConfig = {
  pending: { color: "gold", label: "Pending" },
  shipped: { color: "cyan", label: "Shipped" },
  delivered: { color: "green", label: "Delivered" },
  cancelled: { color: "red", label: "Cancelled" },
  processing: { color: "purple", label: "Processing" },
  paid: { color: "blue", label: "Paid" },
};

export const generateStatusItems = (currentStatus: TStatus) => {
  return Object.entries(statusConfig).map(([key, config]) => ({
    key,
    label: (
      <Tag className="w-full px-5 text-center" color={currentStatus === key ? "gray" : config.color}>
        {config.label}
      </Tag>
    ),
    disabled: currentStatus === key,
  }));
};
