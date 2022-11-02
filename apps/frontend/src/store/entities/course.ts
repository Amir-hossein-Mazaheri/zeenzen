import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const course = createSlice({
  name: "course",
  initialState,
  reducers: {},
});

export const actions = course.actions;

export default course.reducer;