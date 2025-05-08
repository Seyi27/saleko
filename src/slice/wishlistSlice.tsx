import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistResponse = {
  id: number;
  product_id: number;
  created_at: string;
  product: {
    id: number;
    sku: string;
    type: string;
    created_at: string;
    updated_at: string;
    product_category: {
      category_name: string;
      category_type: string;
    };
    brand_name: string;
    product_flats: Array<{
      id: number;
      product_id: number;
      product_category: {
        category_name: string;
        category_type: string;
      };
      brand_name: string;
      images: Array<{
        id: number;
        product_id: number;
        path: string;
        url: string;
      }>;
    }>;
  };
  seller: {
    id: number;
    shop_title: string;
    description: string | null;
    business_name: string;
  };
};

type WishlistType = {
  wishlistCart?: WishlistResponse[] | null;
};

const initialState: WishlistType = {
  wishlistCart: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistResponse[]>) => {
      state.wishlistCart = action.payload;
    },

    removeFromWishlist: (state) => {
      state.wishlistCart = null;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
