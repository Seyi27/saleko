import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  user_id: string;
  updated_at: string;
  created_at: string;
}

interface CreateAccountDataState {
  user: UserState | null;
  notification_reference: string | null;
}

const initialState: CreateAccountDataState = {
  user: null,
  notification_reference: null,
};

const createAccountDataSlice = createSlice({
  name: "createAccountData",
  initialState,
  reducers: {
    addCreateAccountData: (
      state,
      action: PayloadAction<CreateAccountDataState>
    ) => {
      state.user = action.payload.user;
      state.notification_reference = action.payload.notification_reference;
    },

    removeCreateAccountData: (state) => {
      state.user = null;
      state.notification_reference = null;
    },
  },
});

export const { addCreateAccountData, removeCreateAccountData } =
  createAccountDataSlice.actions;

export default createAccountDataSlice.reducer;
