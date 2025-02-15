import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseUrl = "https://staging.saleko.ng";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    marketplaceApi: builder.query({
      query: () => ({
        url: "/api/main-svc/market/all?market",
      }),
    }),
    singleMarketplaceApi: builder.query({
      query: (marketId: number) => ({
        url: `/api/main-svc/market/single/${marketId}`,
      }),
    }),
    fetchCategories: builder.query({
      query: () => ({
        url: "/api/main-svc/productcategory/fetch-visible-categories",
      }),
    }),
  }),
});

export const {
  useMarketplaceApiQuery,
  useLazySingleMarketplaceApiQuery,
  useFetchCategoriesQuery,
} = appApi;
