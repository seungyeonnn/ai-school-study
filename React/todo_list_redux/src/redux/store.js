import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoSlice";
//사용할 이름을 다시 적어줘도 된다,
import logger from "redux-logger";

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
