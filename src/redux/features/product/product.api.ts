/* eslint-disable @typescript-eslint/no-unused-expressions */
import { TProduct } from "@/types/product.type";
import { TQueryParams, TResponseRedux } from "../../../types/global.type";
import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all products query
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["products"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // create products mutation
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    // delete product mutation
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),

    // update product mutation
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    // get single product query
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
} = productApi;
