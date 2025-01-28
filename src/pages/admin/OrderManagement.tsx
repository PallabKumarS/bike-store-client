import { useGetAllOrdersQuery } from "@/redux/features/order/order.api";
import OrderTable from "./OrderTable";
import { useState } from "react";
import { TQueryParams } from "@/types/global.type";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const OrderManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetAllOrdersQuery([...params], {
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
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600 mt-2">
          Check and manage all customer orders
        </p>
      </div>

      {/* table here  */}
      <OrderTable setParams={setParams} isFetching={isFetching} data={orders} />

      {/* extra stats section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-600">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-800 mt-2">
            {orders?.meta?.totalDoc || 0}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-600">
            Delivered Orders
          </h3>
          <p className="text-3xl font-bold text-green-800 mt-2">
            {orders?.data?.filter((order) => order.status === "delivered")
              .length || 0}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-yellow-600">
            Pending Orders
          </h3>
          <p className="text-3xl font-bold text-yellow-800 mt-2">
            {orders?.data?.filter((order) => order.status === "pending")
              .length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
