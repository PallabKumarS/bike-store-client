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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
