import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  user_id: string;
  user_type: string;
  email: string;
  first_name:string;
  last_name:string;
  phone_number: string | null;
  old_user_id: number
}

interface UserDetailsType {
  user: UserType | null;
  token: string | null;
}

const initialState: UserDetailsType = {
  user: null,
  token: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserDetailsType>) => {
      state.user = action.payload.user; 
      state.token = action.payload.token;
    },

    removeUser: (state) => {
      state.user = null; 
      state.token = null;
    },
  },
});

export const {addUser, removeUser} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
