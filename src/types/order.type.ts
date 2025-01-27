export type TOrder = {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  userId: string;
  product: string;
  quantity: number;
  totalPrice: number;
  address: string;
  status?: "pending" | "shipped" | "delivered" | "cancelled" | "processing";
  paymentId?: string;
};
