import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateAccountDataState {
  notification_reference: string | null;
  user_id: string | null;
}

const initialState: CreateAccountDataState = {
  notification_reference: null,
  user_id: null,
};

const createAccountDataSlice = createSlice({
  name: "createAccountData",
  initialState,
  reducers: {
    addCreateAccountDataValues: (
      state,
      action: PayloadAction<CreateAccountDataState>
    ) => {
      state.user_id = action.payload.user_id;
      state.notification_reference = action.payload.notification_reference;
    },

    addNotificationReference: (
      state,
      action: PayloadAction<{ notification_reference: string | null }>
    ) => {
      state.notification_reference = action.payload.notification_reference;
    },

    removeCreateAccountDataValues: (
      state,
    ) => {
      state.user_id = null;
      state.notification_reference = null;
    },
  },
});

export const { addCreateAccountDataValues, removeCreateAccountDataValues,addNotificationReference } =
  createAccountDataSlice.actions;

export default createAccountDataSlice.reducer;
