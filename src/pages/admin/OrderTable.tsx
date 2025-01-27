/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination, Table, Tag } from "antd";
import { TOrder } from "@/types/order.type";
import type { ColumnsType } from "antd/es/table";
import { TMeta } from "@/types/global.type";

type TTableProps = {
  data?: {
    data?: TOrder[];
    meta?: TMeta;
  };
  isFetching: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setParams: any;
};

type TTableData = {
  key: string;
  orderId: string;
  status: "pending" | "shipped" | "delivered" | "cancelled" | "processing";
  totalPrice: number;
  paymentMethod: string;
  createdAt: string;
};

const OrderTable = ({ data, isFetching, setParams }: TTableProps) => {
  const tableData = data?.data?.map((order) => ({
    key: order._id,
    orderId: order.orderId,
    status: order.status || "pending",
    totalPrice: order.totalPrice,
    paymentMethod: order.paymentId || "",
    createdAt: order.createdAt,
  }));

  const columns: ColumnsType<TTableData> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: TTableData["status"]) => (
        <Tag
          color={
            status === "pending"
              ? "gold"
              : status === "delivered"
              ? "green"
              : "blue"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Payment Id",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (paymentMethod) => <Tag color="purple">{paymentMethod}</Tag>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => <span className="font-semibold">${price}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        className="shadow-md rounded-lg"
        pagination={false}
        // loading={isFetching}
        style={{ overflow: "auto" }}
      />
      <Pagination
        className="flex justify-center items-center mt-6"
        current={data?.meta?.page}
        total={data?.meta?.totalDoc}
        pageSize={data?.meta?.limit}
        onChange={(newPage) => setParams([{ name: "page", value: newPage }])}
      />
    </div>
  );
};
export default OrderTable;
