import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CompleteSignupType,
  googleAppleAuthCallbackType,
  LoginType,
  ResetPasswordType,
  SignUpType,
  VerifyOtpType,
} from "../types/authTypes";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
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
      query: (body: ResetPasswordType) => {
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
      query: (body: CompleteSignupType) => {
        return {
          url: "/api/auth-svc/auth/complete-signup",
          method: "post",
          body,
        };
      },
    }),
    googleAuthCallback: builder.mutation({
      query: (body: googleAppleAuthCallbackType) => {
        return {
          url: '/api/auth-svc/auth/social/callback/google',
          method: "post",
          body
        };
      },
    }),
    appleAuthCallback: builder.mutation({
      query: (body: googleAppleAuthCallbackType) => {
        return {
          url: '/api/auth-svc/auth/social/callback/apple',
          method: "post",
          body
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
  useGoogleAuthCallbackMutation,
  useAppleAuthCallbackMutation
} = authApi;
