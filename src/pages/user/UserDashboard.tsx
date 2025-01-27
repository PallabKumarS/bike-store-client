import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import Profile from "./Profile";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const UserDashboard = () => {
  const token = useAppSelector(selectCurrentToken);

  const { data: userData, isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !token,
  });


  if (isFetching) {
    <LoadingSkeleton />;
  }

  return (
    <div>
      <Profile userData={userData?.data} />
    </div>
  );
};

export default UserDashboard;
