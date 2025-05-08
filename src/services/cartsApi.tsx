import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import {
  AddToCartType,
  AddToGuestCartType,
  CheckoutType,
  CreateWishlistType,
  DeleteCartType,
  DeleteGuestCartType,
  DeleteWishlistType,
  GetGuestCartType,
  UpdateCartType,
  UpdateGuestCartType,
} from "../types/appTypes";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  tagTypes: ["getCart", "getWishlist", "getGuest"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.userDetails.token; // extract token from store

      // headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to headers
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCartApi: builder.query({
      query: () => ({
        url: "/api/main-svc-v2/cart",
      }),
      providesTags: ["getCart"],
    }),

    addToCartApi: builder.mutation({
      query: (body: AddToCartType) => ({
        url: "/api/main-svc-v2/cart/add",
        method: "post",
        body,
      }),
      invalidatesTags: ["getCart"],
    }),

    updateCartApi: builder.mutation({
      query: (body: UpdateCartType) => ({
        url: "/api/main-svc-v2/cart/update",
        method: "put",
        body,
      }),
      invalidatesTags: ["getCart"],
    }),

    deleteCartApi: builder.mutation({
      query: (body: DeleteCartType) => ({
        url: "/api/main-svc-v2/cart/delete",
        method: "post",
        body,
      }),
      invalidatesTags: ["getCart"],
    }),

    paystackCheckoutApi: builder.mutation({
      query: (body: CheckoutType) => ({
        url: "/api/main-svc-v2/payment/initiate/paystack",
        method: "post",
        body,
      }),
    }),

    monifyCheckoutApi: builder.mutation({
      query: (body: CheckoutType) => ({
        url: "/api/main-svc-v2/payment/initiate/monify",
        method: "post",
        body,
      }),
    }),

    // Guest endpoint
    getGuestCart: builder.query({
      query: (guestBody: GetGuestCartType) => ({
        url: `/api/main-svc-v2/guest/cart/${guestBody.guest_id}`,
      }),
      providesTags: ["getGuest"],
    }),

    addGuestCart: builder.mutation({
      query: (body: AddToGuestCartType) => ({
        url: `/api/main-svc-v2/guest/cart/add`,
        method: "post",
        body,
      }),
      invalidatesTags: ["getGuest"],
    }),

    updateGuestCart: builder.mutation({
      query: (body: UpdateGuestCartType) => ({
        url: `/api/main-svc-v2/guest/cart/update`,
        method: "put",
        body,
      }),
      invalidatesTags: ["getGuest"],
    }),

    deleteGuestCart: builder.mutation({
      query: (body: DeleteGuestCartType) => ({
        url: `/api/main-svc-v2/guest/cart/delete`,
        method: "post",
        body,
      }),
      invalidatesTags: ["getGuest"],
    }),

    // Wishlist endpoints
    getWishlistApi: builder.query({
      query: () => ({
        url: "/api/main-svc-v2/wishlist",
      }),
      providesTags: ["getWishlist"],
    }),

    createWishlistApi: builder.mutation({
      query: (body: CreateWishlistType) => ({
        url: "/api/main-svc-v2/wishlist",
        method: "post",
        body,
      }),
      invalidatesTags: ["getWishlist"],
    }),

    deleteWishlistApi: builder.mutation({
      query: (body: DeleteWishlistType) => ({
        url: "/api/main-svc-v2/wishlist/delete",
        method: "post",
        body,
      }),
      invalidatesTags: ["getWishlist"],
    }),
  }),
});

export const {
  useGetCartApiQuery,
  useAddToCartApiMutation,
  useUpdateCartApiMutation,
  useDeleteCartApiMutation,
  usePaystackCheckoutApiMutation,
  useMonifyCheckoutApiMutation,
  useGetWishlistApiQuery,
  useCreateWishlistApiMutation,
  useGetGuestCartQuery,
  useAddGuestCartMutation,
  useUpdateGuestCartMutation,
  useDeleteWishlistApiMutation,
  useDeleteGuestCartMutation,
} = cartsApi;
