import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "../services/appApi";
import authValueReducer from "../slice/authValueSlice";
import createAccountDataReducer from "../slice/createAccountDataSlice";

export const store = configureStore({
  reducer: {
    authValue: authValueReducer,
    createAccountData: createAccountDataReducer,

    [authApi.reducerPath]: authApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      appApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)