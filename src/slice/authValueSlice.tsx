import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authValueSliceState{
  activeScreen: string,
  selectedDropdownValue: string,
  emailPhonenumberText: string,
  fpSelectedValueType: string | undefined,
  fpEmailPhoneText: string,
}

const initialState: authValueSliceState = {
  activeScreen:"create_account",
  selectedDropdownValue: "",
  emailPhonenumberText: "",
  fpSelectedValueType: "", // For forgot password
  fpEmailPhoneText: "", // For forgot password
};

const authValueSlice = createSlice({
  name: "authvalue",
  initialState,
  reducers: {
    addActiveScreen: (state, action: PayloadAction<string>) => {
      state.activeScreen = action.payload;
    },
    addSelectedDropdownValue: (state, action: PayloadAction<string>) => {
      state.selectedDropdownValue = action.payload;
    },
    addEmailPhonenumberText: (state, action: PayloadAction<string>) => {
      state.emailPhonenumberText = action.payload;
    },
    addFpSelectedValueType: (state, action: PayloadAction<string | undefined>) => {
      state.fpSelectedValueType = action.payload;
    },
    addFpEmailPhoneText: (state, action: PayloadAction<string>) => {
      state.fpEmailPhoneText = action.payload;
    },
  },
});

export const {
  addSelectedDropdownValue,
  addEmailPhonenumberText,
  addFpSelectedValueType,
  addFpEmailPhoneText,
  addActiveScreen
} = authValueSlice.actions;

export default authValueSlice.reducer;
