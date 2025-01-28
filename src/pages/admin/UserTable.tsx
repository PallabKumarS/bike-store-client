/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Button,
  Tag,
  Space,
  Popconfirm,
  Dropdown,
  Pagination,
} from "antd";
import { TUserData } from "@/types/user.type";
import type { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import {
  useChangeStatusMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/user.api";
import Notify from "@/components/ui/Notify";
import { TMeta, TResponse } from "@/types/global.type";

type TTableProps = {
  data?: {
    data?: TUserData[];
    meta?: TMeta;
  };
  isFetching: boolean;
  setParams: any;
};
type TTableData = {
  key: string;
  name: string;
  email: string;
  role: string;
  status: string;
  userId: string;
};

const UserTable = ({ isFetching, data, setParams }: TTableProps) => {
  // api hooks
  const [changeUserStatus] = useChangeStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const tableData = data?.data?.map((user) => ({
    key: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    userId: user.userId,
  }));

  const getStatusItems = (currentStatus: string) => [
    {
      key: "active",
      label: (
        <Tag color={currentStatus === "active" ? "gray" : "green"}>
          Activate
        </Tag>
      ),
      disabled: currentStatus === "active",
    },
    {
      key: "blocked",
      label: (
        <Tag color={currentStatus === "blocked" ? "gray" : "red"}>
          Deactivate
        </Tag>
      ),
      disabled: currentStatus === "blocked",
    },
  ];

  const columns: ColumnsType<TTableData> = [
    // first column
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tag color="geekblue" className="font-medium">
          {text}
        </Tag>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          maxWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    },

    // second column
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <Tag color="cyan">{text}</Tag>,
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          maxWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    },

    // third column
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Tag color="purple">{text}</Tag>,
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          maxWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    },

    // fourth column
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "blue" : "green"}>
          {role.toUpperCase()}
        </Tag>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          maxWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    },

    // fifth column
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "error"}>
          {status === "active" ? "ACTIVE" : "DEACTIVATED"}
        </Tag>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          maxWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    },

    // sixth column
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Dropdown
            menu={{
              items: getStatusItems(record.status),
              onClick: ({ key }) => handleStatusChange(record.userId, key),
            }}
          >
            <Button type="primary" className="bg-blue-500">
              Change Status <DownOutlined />
            </Button>
          </Dropdown>

          <Popconfirm
            title="Delete user?"
            onConfirm={() => handleDelete(record.userId)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
      align: "center",
      onCell: () => ({
        style: {
          textAlign: "center",
          maxWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    },
  ];

  // handle status change here
  const handleStatusChange = async (userId: string, status: string) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Updating user status...",
    });

    try {
      const res = (await changeUserStatus({
        id: userId,
        status,
      })) as TResponse<any>;

      if (res?.data?.success) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "User status updated successfully!",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: "Something went wrong!",
      });
    }
  };

  // handle delete here
  const handleDelete = async (userId: string) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Deleting user...",
    });

    try {
      const res = (await deleteUser(userId)) as TResponse<any>;
      if (res?.data?.success) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "User deleted successfully!",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: "Something went wrong!",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Table Section */}
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        className="shadow-md rounded-lg"
        pagination={false}
        rowKey={(record) => record.key}
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

export default UserTable;
