


import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSilce";


export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
