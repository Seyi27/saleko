import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  user_id: string;
  updated_at: string;
  created_at: string;
}

interface CreateAccountDataState {
  user?: UserState | null;
  notification_reference: string | null;
  user_id?: string | null;
}

const initialState: CreateAccountDataState = {
  user: null,
  notification_reference: null,
  user_id: null,
};

const createAccountDataSlice = createSlice({
  name: "createAccountData",
  initialState,
  reducers: {
    addCreateAccountDataByEmail: (
      state,
      action: PayloadAction<CreateAccountDataState>
    ) => {
      state.user = action.payload.user;
      state.notification_reference = action.payload.notification_reference;
    },

    addCreateAccountDataByPhone: (
      state,
      action: PayloadAction<CreateAccountDataState>
    ) => {
      state.user_id = action.payload.user_id;
      state.notification_reference = action.payload.notification_reference;
    },

    removeCreateAccountDataByEmail: (state) => {
      state.user = null;
      state.notification_reference = null;
    },

    removeCreateAccountDataByPhone: (
      state,
    ) => {
      state.user_id = null;
      state.notification_reference = null;
    },
  },
});

export const { addCreateAccountDataByEmail, addCreateAccountDataByPhone } =
  createAccountDataSlice.actions;

export default createAccountDataSlice.reducer;
