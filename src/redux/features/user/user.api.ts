import { TUserData } from "@/types/user.type";
import baseApi from "../../api/baseApi";
import { TResponseRedux } from "@/types/global.type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get personal info
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // get all users query
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<TUserData[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // update status of user
    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useChangeStatusMutation,
  useDeleteUserMutation,
} = userApi;
