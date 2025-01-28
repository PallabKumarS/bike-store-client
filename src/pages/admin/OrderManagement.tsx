/* eslint-disable react-hooks/rules-of-hooks */
import {
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
} from "@/redux/features/order/order.api";
import OrderTable from "./OrderTable";
import { useState } from "react";
import { TQueryParams } from "@/types/global.type";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const OrderManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);

  const user = useAppSelector(selectCurrentUser);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderQuery: any;

  switch (user?.role || "customer") {
    case "admin":
      orderQuery = useGetAllOrdersQuery([...params], {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
      });
      break;
    case "customer":
      orderQuery = useGetMyOrdersQuery(undefined, {
        refetchOnReconnect: true,
      });
      break;
    default:
      orderQuery = {};
  }

  const { data: orders, isLoading, isFetching } = orderQuery || {};

  if (isLoading) {
    return <LoadingSkeleton />;
  }


  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {user?.role === "admin" ? "Order Management" : "My Order List"}
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.role === "admin"
            ? "Check and manage all customer orders"
            : "Check all your orders and their status"}
        </p>
      </div>

      {/* table here  */}
      <OrderTable
        user={user}
        setParams={setParams}
        isFetching={isFetching}
        data={orders}
      />
    </div>
  );
};

export default OrderManagement;
