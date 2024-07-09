import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slice/TodoSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
