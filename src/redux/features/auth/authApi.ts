import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),

    register: builder.mutation({
      query: (registerInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: registerInfo,
      }),

      invalidatesTags: ["users"],
    }),

    // change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useChangePasswordMutation} = authApi;
