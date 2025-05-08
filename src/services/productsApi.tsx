import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { CategoryPaginationApiType, NamePaginationApiType, PaginationApiType } from "../types/productTypes";
import { RootState } from "../store/store";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.userDetails.token; // extract token from store

      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to headers
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    featuredProductsApi: builder.query({
      query: (fproduct: PaginationApiType) => ({
        url: `/api/main-svc-v2/public/products/attributes?type=${fproduct.type}&per_page=${fproduct.per_page}&page=${fproduct.page}`,
      }),
    }),

    newProductsApi: builder.query({
      query: (fproduct: PaginationApiType) => ({
        url: `/api/main-svc-v2/public/products/attributes?type=${fproduct.type}&per_page=${fproduct.per_page}&page=${fproduct.page}`,
      }),
    }),

    negotiableProductsApi: builder.query({
      query: (nProducts: PaginationApiType) => ({
        url: `/api/main-svc-v2/public/products?type=${nProducts.type}&per_page=${nProducts.per_page}&page=${nProducts.page}`,
      }),
    }),

    getProductDetailsWithSku: builder.query({
      query: (sku: string) => ({
        url: `/api/main-svc-v2/public/products?sku=${sku}`,
      }),
    }),

    // getAllProductsByName with pagination for search page
    getAllProductsByName: builder.query({
      query: (productsByName: NamePaginationApiType) => ({
        url: `/api/main-svc-v2/public/products?name=${productsByName.name}&per_page=${productsByName.per_page}&page=${productsByName.page}`,
      }),
    }),

    // getAllProductsByName without pagination for the search bar for product name
    getAllProductsByNameWithoutPagination: builder.query({
      query: (name: string) => ({
        url: `/api/main-svc-v2/public/products?name=${name}`,
      }),
    }),

    getAllProductsByCategory: builder.query({
      query: (productsByCategory: CategoryPaginationApiType) => ({
        url: `/api/main-svc-v2/public/products?category_name=${productsByCategory.categoryName}&per_page=${productsByCategory.per_page}&page=${productsByCategory.page}`,
      }),
    }),

    getDiscountedProducts: builder.query({
      query: (discountedProducts: PaginationApiType) => ({
        url: `/api/main-svc-v2/public/products?type=${discountedProducts.type}&per_page=${discountedProducts.per_page}&page=${discountedProducts.page}`,
      }),
    }),

    getBestSellerProducts: builder.query({
      query: (bestSellerProducts: PaginationApiType) => ({
        url: `/api/main-svc-v2/public/products/best-selling-products?per_page=${bestSellerProducts.per_page}&page=${bestSellerProducts.page}`,
      }),
    }),

    getTopSeller: builder.query({
      query: (topSeller: PaginationApiType) => ({
        url: `/api/main-svc-v2/public/products/best-sellers?per_page=${topSeller.per_page}&page=${topSeller.page}`,
      }),
    }),
  }),
});

export const {
  useLazyFeaturedProductsApiQuery,
  useLazyNewProductsApiQuery,
  useLazyNegotiableProductsApiQuery,
  useLazyGetProductDetailsWithSkuQuery,
  useLazyGetAllProductsByNameQuery,
  useLazyGetAllProductsByCategoryQuery,
  useLazyGetAllProductsByNameWithoutPaginationQuery,
  useLazyGetDiscountedProductsQuery,
  useLazyGetBestSellerProductsQuery,
  useLazyGetTopSellerQuery
} = productsApi;
