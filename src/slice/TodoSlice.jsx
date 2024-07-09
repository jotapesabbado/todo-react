import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();
  return todos;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    todoAdded(state, action) {
      state.entities.push(action.payload);
    },
    todoUpdated(state, action) {
      const { id, title, completed } = action.payload;
      const existingTodo = state.entities.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.completed = completed;
      }
    },
    todoDeleted(state, action) {
      const { id } = action.payload;
      const existingTodo = state.entities.find((todo) => todo.id === id);
      if (existingTodo) {
        state.entities = state.entities.filter((todo) => todo.id !== id);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    }),
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    }),
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
    })
  },
});

export const { todoAdded, todoUpdated, todoDeleted } = todosSlice.actions;

export default todosSlice.reducer;
