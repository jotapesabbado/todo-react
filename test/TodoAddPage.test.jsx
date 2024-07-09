import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../src/slice/TodoSlice';
import { TodoAddPage } from '../src/pages/TodoAddPage';

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

describe('TodoAddPage', () => {
  test('renders the TodoAddPage correctly', () => {
    renderWithProviders(<TodoAddPage />);

    expect(screen.getByText(/Add todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('handles title input change', () => {
    renderWithProviders(<TodoAddPage />);

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });

    expect(titleInput.value).toBe('New Todo');
  });

  test('handles completed checkbox change', () => {
    renderWithProviders(<TodoAddPage />);

    const completedCheckbox = screen.getByLabelText(/Completed/i);
    fireEvent.click(completedCheckbox);

    expect(completedCheckbox.checked).toBe(true);
  });

  test('handles add action with empty title', () => {
    renderWithProviders(<TodoAddPage />);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Fill in all fields/i)).toBeInTheDocument();
  });

  test('handles add action with valid input', () => {
    const initialState = {
      todos: {
        entities: [],
        loading: false,
      },
    };

    const { store } = renderWithProviders(<TodoAddPage />, { reduxState: initialState });

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });

    const completedCheckbox = screen.getByLabelText(/Completed/i);
    fireEvent.click(completedCheckbox);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    const state = store.getState();
    expect(state.todos.entities).toHaveLength(1);
    expect(state.todos.entities[0].title).toBe('New Todo');
    expect(state.todos.entities[0].completed).toBe(true);
  });
});
