/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import Notify from "@/components/ui/Notify";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://pks-bike-store-server.vercel.app/api",
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // set token in header here
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  const toastId = (api.getState() as RootState).auth.loginToastId;

  if (result?.error?.status === 404) {
    Notify({
      destroyId: toastId as string,
      toastId: "2",
      type: "error",
      message:
        (result?.error?.data as { message: string })?.message || "Not Found",
    });
  }

  if (result?.error?.status === 403) {
    Notify({
      destroyId: toastId as string,
      toastId: "2",
      type: "error",
      message:
        (result?.error?.data as { message: string })?.message || "Not Found",
    });
  }

  if (result?.error?.status === 401) {
    // send refresh token
    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const refreshTokenResult = await res.json();

    // checking if the refresh token expired or not
    if (refreshTokenResult?.data?.accessToken) {
      const user = verifyToken(refreshTokenResult.data.accessToken);

      // store new access token in redux
      api.dispatch(
        setUser({
          user: user,
          token: refreshTokenResult.data.accessToken,
        })
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if refresh token is expired
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["users", "products", "orders"],
});

export default baseApi;
