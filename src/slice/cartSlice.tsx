import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cartTypes";

type UserCart = {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_id: number;
  cart_currency_code: string;
  sub_total: string;
  grand_total: string;
  shipping_amount: string;
  tax_total: string;
  discount_amount: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  items: CartItem[];
};

type CartDataType = {
  user_cart?: UserCart | null;
  total_price: number;
};

type AddCartType = {
  cart: CartItem[];
  total_price: number;
};

const initialState: CartDataType = {
  user_cart: {
    id: 0,
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_id: 0,
    cart_currency_code: "",
    sub_total: "0",
    grand_total: "0",
    shipping_amount: "0",
    tax_total: "0",
    discount_amount: "0",
    is_active: 0,
    created_at: "",
    updated_at: "",
    items: [],
  },
  total_price: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addUserCart: (state, action: PayloadAction<UserCart>) => {
      state.user_cart = action.payload;
    },

    addCart: (state, action: PayloadAction<AddCartType>) => {
      if (state.user_cart && Array.isArray(action.payload.cart)) {
        state.user_cart.items = action.payload.cart;
        state.total_price = action.payload.total_price;
      }
    },

    removeCart: (state) => {
      state.user_cart = null;
    },
  },
});

export const { addUserCart, addCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
