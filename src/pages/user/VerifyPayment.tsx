import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Descriptions, Result, Statistic, Tag } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "@/redux/features/order/order.api";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import {
  ShoppingOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IOrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyPayment() {
  const [searchParams] = useSearchParams();

  const { data, isFetching } = useVerifyPaymentQuery(
    searchParams.get("order_id") as string,
    {
      skip: !searchParams.get("order_id"),
    }
  );

  const orderData = data?.data?.[0];

  if (isFetching) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* first card here  */}

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
                <Result
                  status={
                    orderData.bank_status === "Success"
                      ? "success"
                      : orderData.bank_status === "Cancel"
                      ? "info"
                      : orderData.bank_status === "Failed"
                      ? "error"
                      : "warning"
                  }
                  title={`Payment ${orderData.bank_status}!`}
                  subTitle={
                    <div className="text-center">
                      <p className="mb-2">
                        Transaction ID: {orderData.bank_trx_id}
                      </p>
                      <p>
                        Amount: {orderData.currency} {orderData.amount}
                      </p>
                    </div>
                  }
                  extra={[
                    <Statistic
                      key="order-number"
                      title="Order Number"
                      value={orderData.customer_order_id}
                      prefix={<ShoppingOutlined />}
                    />,
                  ]}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link to="/customer/my-orders">
              <Button
                type="primary"
                size="large"
                className={`${
                  orderData.bank_status === "Success"
                    ? "bg-blue-500"
                    : orderData.bank_status === "Failed"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                Track Your Orders <ArrowRightOutlined />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* second card here  */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="mb-4 text-center">
                  <Statistic
                    title="Transaction Date"
                    value={new Date(orderData.date_time).toDateString()}
                    prefix={<CalendarOutlined />}
                  />
                </div>
                <Descriptions
                  bordered
                  column={2}
                  layout="vertical"
                  size="small"
                >
                  <Descriptions.Item label="Payment Method">
                    <Tag color="purple">{orderData.method}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Transaction ID">
                    <Tag color="blue">{orderData.bank_trx_id}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Invoice Number">
                    <Tag color="cyan">{orderData.invoice_no}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="SP Code">
                    <Tag color="geekblue">{orderData.sp_code}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Customer Name">
                    <Tag color="magenta">{orderData.name}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    <Tag color="gold">{orderData.email}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    <Tag color="lime">{orderData.phone_no}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    <Tag color="green">{orderData.address}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Message" span={2}>
                    <Tag color="orange">{orderData.sp_message}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
