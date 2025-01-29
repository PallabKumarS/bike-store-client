/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Pagination, Space, Table, Tag } from "antd";
import { TOrder } from "@/types/order.type";
import type { ColumnsType } from "antd/es/table";
import { TMeta, TResponse } from "@/types/global.type";
import Notify from "@/components/ui/Notify";
import { DownOutlined } from "@ant-design/icons";
import { useChangeOrderStatusMutation } from "@/redux/features/order/order.api";
import { generateStatusItems, TStatus } from "@/utils/statusGenerator";
import { TUser } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";

type TTableProps = {
  data?: {
    data?: TOrder[];
    meta?: TMeta;
  };
  isFetching: boolean;
  setParams: any;
  user: TUser | null;
};

type TTableData = {
  key: string;
  orderId: string;
  status:
    | "pending"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "paid"
    | "processing";
  totalPrice: number;
  paymentId: string | undefined;
  createdAt: string;
  paymentUrl: string;
};

const OrderTable = ({ data, setParams, isFetching, user }: TTableProps) => {
  // api hooks
  const [changeOrderStatus] = useChangeOrderStatusMutation();

  // table data
  const tableData = data?.data?.map((order) => ({
    key: order._id,
    orderId: order.orderId,
    status: order.status || "pending",
    totalPrice: order.totalPrice,
    paymentId: order?.transaction?.paymentId,
    createdAt: order.createdAt,
    paymentUrl: order.transaction?.paymentUrl || "",
  }));

  const getStatusItems = (currentStatus: string) =>
    generateStatusItems(currentStatus as TStatus);

  const baseColumns: ColumnsType<TTableData> = [
    // first column
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <Tag color="cyan">{text}</Tag>,
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },

    // second column
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
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },

    // third Column
    {
      title: "Payment Id",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (_, record) => (
        <Tag color="purple">{record?.paymentId || ""}</Tag>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },

    // fourth column
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => <Tag color="magenta">${price}</Tag>,
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },

    // fifth column
    {
      title: "Ordered At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <Tag color="geekblue">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Tag>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },

    // sixth column
    {
      title: "Check Payment",
      dataIndex: "paymentUrl",
      key: "paymentUrl",
      render: (url) => (
        <Tag color="teal">
          <Link to={url}>Payment Url</Link>
        </Tag>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },
  ];

  const adminColumn: ColumnsType<TTableData> = [
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Dropdown
            menu={{
              items: getStatusItems(record.status),
              onClick: ({ key }) => handleStatusChange(record.orderId, key),
            }}
          >
            <Button type="primary" className="bg-blue-500">
              Change Status <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },
  ];

  const userColumn: ColumnsType<TTableData> = [
    {
      title: "Track Order",
      key: "track",
      render: (_, record) => (
        <Link to={`/customer/order-tracking/${record.orderId}`}>
          <Button type="primary" className="bg-blue-500">
            Track Order
          </Button>
        </Link>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          overflow: "auto",
        },
      }),
    },
  ];

  const columns =
    user?.role === "admin"
      ? [...baseColumns, ...adminColumn]
      : [...baseColumns, ...userColumn];

  const handleStatusChange = async (orderId: string, status: string) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Updating user status...",
    });

    try {
      const res = (await changeOrderStatus({
        id: orderId,
        status,
      })) as TResponse<any>;

      if (res?.data?.success) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "Order status updated successfully!",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res.error?.data?.message || "Something went wrong",
        });
      }
    } catch (err: any) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: err?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Table Section */}
      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        className="shadow-md rounded-lg"
        pagination={false}
        loading={isFetching}
        style={{ overflow: "auto" }}
      />

      {/* Pagination Section */}
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
