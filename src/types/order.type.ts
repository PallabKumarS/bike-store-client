import { TProduct } from "./product.type";

export type TOrder = {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  userId: string;
  productId: TProduct;
  quantity: number;
  totalPrice: number;
  address: string;
  status?:
    | "pending"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "processing"
    | "paid";
  transaction?: {
    paymentId?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
    paymentUrl?: string;
  };
};

export type TOrderStatus =
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "paid"
  | "processing";
