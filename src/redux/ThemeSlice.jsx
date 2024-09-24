// src/redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light", // Default theme
  reducers: {
    setTheme: (state, action) => action.payload,
    toggleTheme: (state) => (state === "light" ? "dark" : "light"),
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
