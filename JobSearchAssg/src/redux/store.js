import { configureStore } from "@reduxjs/toolkit";

import filterSetter from "./filters.js";

export const store = configureStore({
  reducer: {
    filterset: filterSetter,
  },
});
