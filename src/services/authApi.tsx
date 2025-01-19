import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompleteSignup, LoginType, SignUpType, VerifyOtpType } from "../types/authTypes";

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
      query: (body: LoginType) => {
        return {
          url: "/api/auth-svc/auth/login",
          method: "post",
          body,
        };
      },
    }),
    signUp: builder.mutation({
      query: (body: SignUpType) => {
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
          url: "",
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (body: VerifyOtpType) => {
        return {
          url: "/api/auth-svc/otp/verify",
          method: "post",
          body,
        };
      },
    }),
    completeSignup: builder.mutation({
      query: (body: CompleteSignup) => {
        return {
          url: "/api/auth-svc/auth/complete-signup",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useCompleteSignupMutation
} = authApi;
