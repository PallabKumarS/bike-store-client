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
      invalidatesTags: ["orders", "products"],
    }),

    // update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
