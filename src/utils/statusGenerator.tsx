import { Tag } from "antd";

export type TStatus = "pending" | "shipped" | "delivered" | "cancelled" | "processing";

interface StatusConfig {
  [key: string]: {
    color: string;
    label: string;
  };
}

const statusConfig: StatusConfig = {
  pending: { color: "gold", label: "Pending" },
  shipped: { color: "blue", label: "Shipped" },
  delivered: { color: "green", label: "Delivered" },
  cancelled: { color: "red", label: "Cancelled" },
  processing: { color: "purple", label: "Processing" },
};

export const generateStatusItems = (currentStatus: TStatus) => {
  return Object.entries(statusConfig).map(([key, config]) => ({
    key,
    label: (
      <Tag color={currentStatus === key ? "gray" : config.color}>
        {config.label}
      </Tag>
    ),
    disabled: currentStatus === key,
  }));
};
