import React from "react";
import { Form, Button } from "react-bootstrap";

export function TodoForm({ title, completed, onTitleChange, onCompletedChange, onSubmit, error }) {
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor="todo-title">Title</Form.Label>
        <Form.Control
          id="todo-title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={onTitleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="todo-completed">Completed</Form.Label>
        <Form.Check
          id="todo-completed"
          type="checkbox"
          checked={completed}
          onChange={onCompletedChange}
        />
      </Form.Group>
      {error && <p>{error}</p>}
      <Button onClick={onSubmit} variant="primary">
        Submit
      </Button>
    </>
  );
}
