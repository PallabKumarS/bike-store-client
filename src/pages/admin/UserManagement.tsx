import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import UserTable from "./UserTable";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { TQueryParams } from "@/types/global.type";
import { useState } from "react";

const UserManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: users, isFetching } = useGetAllUsersQuery([...params], {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) {
    <LoadingSkeleton />;
  }

  return (
    <div>
      <UserTable setParams={setParams} isFetching data={users} />
    </div>
  );
};

export default UserManagement;
