import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

const initialState = {
  email: "",
  password: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    SIGN_UP: (
      store,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      store.email = action.payload.email;
      store.password = action.payload.password;
    },
    SIGN_IN: (store, action: PayloadAction<{ email: string }>) => {
      store.email = action.payload.email;
      store.password = "";
    },
    SIGN_Up_FAILED: (store) => {
      store.email = "";
      store.password = "";
    },
  },
});

export const selectUserCredentials = (store: RootState) => {
  const { email, password } = store.entities.user;

  return { email, password };
};

export const { SIGN_UP, SIGN_IN, SIGN_Up_FAILED } = user.actions;

export default user.reducer;
