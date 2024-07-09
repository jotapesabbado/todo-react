import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { fetchTodos } from "./slice/TodoSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

store.dispatch(fetchTodos());

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)