import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import UserTable from "./UserTable";
import { TQueryParams } from "@/types/global.type";
import { useState } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const UserManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery([...params], {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600 mt-2">
          Manage and monitor all user accounts
        </p>
      </div>
      {/* Table Section */}
      <UserTable setParams={setParams} isFetching={isFetching} data={users} />

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-indigo-600">Total Users</h3>
          <p className="text-3xl font-bold text-indigo-800 mt-2">
            {users?.meta?.totalDoc || 0}
          </p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-emerald-600">
            Active Users
          </h3>
          <p className="text-3xl font-bold text-emerald-800 mt-2">
            {users?.data?.filter((user) => user.status === "active").length ||
              0}
          </p>
        </div>
        <div className="bg-rose-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-rose-600">
            Deactivated Users
          </h3>
          <p className="text-3xl font-bold text-rose-800 mt-2">
            {users?.data?.filter((user) => user.status === "blocked").length ||
              0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
