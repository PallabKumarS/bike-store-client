import baseApi from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types/global.type";
import { TOrder } from "@/types/order.type";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all orders
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["orders"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get my orders
    getMyOrders: builder.query({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    // create order with payment
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders", "products", "product", "order", "payment"],
    }),

    // update order status
    changeOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["orders"],
    }),

    // get single order
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    // verify payment
    verifyPayment: builder.query({
      query: (id) => ({
        url: `/verify-payment/${id}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useChangeOrderStatusMutation,
  useGetSingleOrderQuery,
  useVerifyPaymentQuery,
} = orderApi;
