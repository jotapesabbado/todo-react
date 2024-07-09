import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../src/slice/TodoSlice';
import { TodoListPage } from '../src/pages/TodoListPage';

const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = configureStore({
    reducer: { todos: todosReducer },
    preloadedState: reduxState,
  });

  return {
    ...render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    ),
    store,
  };
};

describe('TodoListPage', () => {
  test('renders the TodoListPage with initial state', () => {
    const initialState = {
      todos: {
        entities: [],
        loading: false,
      },
    };

    renderWithProviders(<TodoListPage />, { reduxState: initialState });

    expect(screen.getByText(/List todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Add todo/i)).toBeInTheDocument();
  });

  test('handles search input change', () => {
    const initialState = {
      todos: {
        entities: [],
        loading: false,
      },
    };

    renderWithProviders(<TodoListPage />, { reduxState: initialState });

    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
  });

  test('handles delete action', () => {
    const initialState = {
      todos: {
        entities: [{ id: 1, title: 'Test Todo' }],
        loading: false,
      },
    };

    const { store } = renderWithProviders(<TodoListPage />, { reduxState: initialState });

    // Verify the todo item is rendered
    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();

    // Find the delete button and simulate a click event
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Check the state of the store
    const state = store.getState();
    expect(state.todos.entities).toHaveLength(0);

    // Verify the todo item is no longer rendered
    expect(screen.queryByText(/Test Todo/i)).not.toBeInTheDocument();
  });
});
