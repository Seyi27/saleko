import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { AddCustomerAddressDataType, CustomerAddressApiType } from "../types/appTypes";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const appApi = createApi({
  reducerPath: "appApi",
  tagTypes: ["fetchCustomerAddress"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.userDetails.token; // extract token from store

      // headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to headers
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    marketplaceApi: builder.query({
      query: () => ({
        url: "/api/main-svc-v2/public/products/market-place",
      }),
    }),
    singleMarketplaceApi: builder.query({
      query: (marketId: number) => ({
        url: `/api/main-svc/market/single/${marketId}`,
      }),
    }),

    fetchAllCategories: builder.query({
      query: () => ({
        url: "/api/main-svc-v2/public/products/categories/tree",
      }),
    }),

    fetchBanner: builder.query({
      query: (type: string) => ({
        url: `/api/main-svc-v2/media/get-items?type=${type}`,
      }),
    }),

    fetchPickupLocation: builder.query({
      query: () => ({
        url: `/api/main-svc-v2/products/pickup-locations`,
      }),
    }),

    fetchCustomerAddress: builder.query({
      query: (query: CustomerAddressApiType) => ({
        url: `/api/main-svc-v2/products/customer-addresses?customer_id=${query.customer_id}`,
      }),
      providesTags: ["fetchCustomerAddress"],
    }),

    addCustomerAddress: builder.mutation({
      query: (body: AddCustomerAddressDataType) => ({
        url: `/api/main-svc-v2/products/create-customer-address`,
        method:'post',
        body
      }),
      invalidatesTags: ["fetchCustomerAddress"],
    }),
  }),
});

export const {
  useMarketplaceApiQuery,
  useLazySingleMarketplaceApiQuery,
  // useFetchCategoriesQuery,
  useFetchBannerQuery,
  useFetchPickupLocationQuery,
  useLazyFetchCustomerAddressQuery,
  useAddCustomerAddressMutation,
  useFetchAllCategoriesQuery
} = appApi;
