import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://staging.saleko.ng";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set("Accept", "application/json");
    //   headers.set("Content-Type", "application/json");
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: any) => {
        return {
          url: "/api/auth-svc/auth/login",
          method: "post",
          body,
        };
      },
    }),
    signUp: builder.mutation({
      query: (body: any) => {
        return {
          url: "/api/auth-svc/auth/signup",
          method: "post",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: "ssdsds",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
} = authApi;
