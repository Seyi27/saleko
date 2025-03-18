import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { FeaturedProductsApiType } from "../types/productTypes";

const baseUrl = process.env.REACT_APP_BASE_URL_MAIN_SVC;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    featuredProductsApi: builder.query({
      query: (fproduct: FeaturedProductsApiType) => ({
        url: `/product/featured-products?pageSize=${fproduct.pageSize}&pageNumber=${fproduct.pageNumber}&searchValue=&channel=default&locale=en`,
      }),
    }),

    newProductsApi: builder.query({
      query: (fproduct: FeaturedProductsApiType) => ({
        url: `/product/new-products?pageSize=${fproduct.pageSize}&pageNumber=${fproduct.pageNumber}&searchValue=&channel=default&locale=en`,
      }),
    }),
  }),
});

export const { useLazyFeaturedProductsApiQuery, useLazyNewProductsApiQuery } =
  productsApi;
