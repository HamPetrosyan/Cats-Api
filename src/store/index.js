import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./catSlice";

export default configureStore({
  reducer: {
    cat: catReducer,
  },
});
