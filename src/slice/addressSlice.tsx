import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerAddressDataType } from "../types/appTypes";

type CustomerAddressProp = {
  customerAddress: CustomerAddressDataType[];
};

const initialState: CustomerAddressProp = {
  customerAddress: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addToCustomerAddress: (
      state,
      action: PayloadAction<CustomerAddressDataType[]>
    ) => {
      state.customerAddress = action.payload;
    },

    removeCustomerAddress: (state) => {
      state.customerAddress = [];
    },
  },
});

export const { addToCustomerAddress, removeCustomerAddress } = addressSlice.actions;

export default addressSlice.reducer;
