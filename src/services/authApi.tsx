import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CompleteSignup,
  LoginType,
  ResetPassword,
  SignUpType,
  VerifyOtpType,
} from "../types/authTypes";

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
    resetPassword: builder.mutation({
      query: (body: ResetPassword) => {
        return {
          url: "/api/auth-svc/auth/reset-password",
          method: "post",
          body,
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
    sendOtpCode: builder.mutation({
      query: (body: SignUpType) => {
        return {
          url: "/api/auth-svc/otp/send",
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
    googleAuthCallback: builder.mutation({
      query: (token: string) => {
        return {
          url: `/api/auth-svc/auth/social/callback/google?token=${token}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useCompleteSignupMutation,
  useSendOtpCodeMutation,
  useGoogleAuthCallbackMutation
} = authApi;
