import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useGetAllOrdersQuery } from "@/redux/features/order/order.api";
import OrderTable from "./OrderTable";
import { useState } from "react";
import { TQueryParams } from "@/types/global.type";

const OrderManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);

  const { data: orders, isFetching } = useGetAllOrdersQuery([...params], {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) {
    <LoadingSkeleton />;
  }

  return (
    <div>
      <OrderTable setParams={setParams} isFetching data={orders} />
    </div>
  );
};

export default OrderManagement;
