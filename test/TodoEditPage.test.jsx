import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../src/slice/TodoSlice';
import { TodoEditPage } from '../src/pages/TodoEditPage';
import { vi } from 'vitest';

const renderWithProviders = (ui, { reduxState, route = '/' } = {}) => {
  const store = configureStore({
    reducer: { todos: todosReducer },
    preloadedState: reduxState,
  });

  window.history.pushState({}, 'Test page', route);

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/edit-todo/:id" element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
    store,
  };
};

describe('TodoEditPage', () => {
  const initialState = {
    todos: {
      entities: [
        { id: 1, title: 'Test Todo', completed: false },
      ],
      loading: false,
    },
  };

  test('renders the TodoEditPage correctly', () => {
    renderWithProviders(<TodoEditPage />, {
      reduxState: initialState,
      route: '/edit-todo/1',
    });

    expect(screen.getByText(/Edit todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('handles title input change', () => {
    renderWithProviders(<TodoEditPage />, {
      reduxState: initialState,
      route: '/edit-todo/1',
    });

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Todo' } });

    expect(titleInput.value).toBe('Updated Todo');
  });

  test('handles completed checkbox change', () => {
    renderWithProviders(<TodoEditPage />, {
      reduxState: initialState,
      route: '/edit-todo/1',
    });

    const completedCheckbox = screen.getByLabelText(/Completed/i);
    fireEvent.click(completedCheckbox);

    expect(completedCheckbox.checked).toBe(true);
  });

  test('handles update action with empty title', () => {
    renderWithProviders(<TodoEditPage />, {
      reduxState: initialState,
      route: '/edit-todo/1',
    });

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    fireEvent.change(titleInput, { target: { value: '' } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Fill in all fields/i)).toBeInTheDocument();
  });

  test('handles update action with valid input', () => {
    const { store } = renderWithProviders(<TodoEditPage />, {
      reduxState: initialState,
      route: '/edit-todo/1',
    });

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Todo' } });

    const completedCheckbox = screen.getByLabelText(/Completed/i);
    fireEvent.click(completedCheckbox);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    const state = store.getState();
    expect(state.todos.entities).toHaveLength(1);
    expect(state.todos.entities[0].title).toBe('Updated Todo');
    expect(state.todos.entities[0].completed).toBe(true);
  });
});
