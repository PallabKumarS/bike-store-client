import { Steps, Card, Tag, Descriptions } from "antd";
import { TOrder, TOrderStatus } from "@/types/order.type";
import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "@/redux/features/order/order.api";
import { TResponse } from "@/types/global.type";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const orderStatusMap = {
  pending: 0,
  paid: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  cancelled: 0,
};

const statusConfig: Record<TOrderStatus, { color: string; label: string }> = {
  pending: { color: "gold", label: "Pending" },
  shipped: { color: "cyan", label: "Shipped" },
  delivered: { color: "green", label: "Delivered" },
  cancelled: { color: "red", label: "Cancelled" },
  processing: { color: "purple", label: "Processing" },
  paid: { color: "blue", label: "Paid" },
};

const OrderTracking = () => {
  const { orderId } = useParams();

  const { data: order, isFetching } = useGetSingleOrderQuery(orderId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !orderId,
  });

  const currentStep =
    orderStatusMap[(order as TResponse<TOrder>)?.data?.status || "pending"];

  if (isFetching) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card
        title={`Order #${(order as TResponse<TOrder>)?.data?.orderId}`}
        className="mb-6"
      >
        {!(order?.data?.status === "cancelled") ? (
          <Steps
            current={currentStep}
            items={[
              { title: "Pending", description: "Order Placed" },
              { title: "Paid", description: "Payment Received" },
              { title: "Processing", description: "Order Confirmed" },
              { title: "Shipped", description: "On the Way" },
              { title: "Delivered", description: "Order Completed" },
            ]}
          />
        ) : (
          <Steps
            current={0}
            status="error"
            items={[{ title: "Cancelled", description: "Order Cancelled" }]}
          />
        )}
      </Card>

      <Card title="Order Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Order Status">
            <Tag
              color={statusConfig[order?.data?.status as TOrderStatus]?.color}
            >
              {statusConfig[order?.data?.status as TOrderStatus]?.label ||
                order?.data?.status?.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Order Date">
            {new Date(order?.data?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            ${(order as TResponse<TOrder>)?.data?.totalPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            <Tag color="green">Paid</Tag>
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <Card className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">
                  {(order as TResponse<TOrder>)?.data?.productId.name}
                </h4>
                <p className="text-gray-500">
                  Quantity:
                  {(order as TResponse<TOrder>)?.data?.quantity}
                </p>
              </div>
              <Tag color="blue">
                ${(order as TResponse<TOrder>)?.data?.productId.price}
              </Tag>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default OrderTracking;
