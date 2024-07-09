import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { todoUpdated } from "../slice/TodoSlice";
import { Container, Row, Col } from "react-bootstrap";
import { TodoForm } from "../components/TodoForm";

export function TodoEditPage() {
  const { pathname } = useLocation();
  const todoId = parseInt(pathname.replace("/react-todo/edit-todo/", ""));

  const todo = useSelector((state) =>
    state.todos.entities.find((todo) => todo.id === todoId)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCompletedChange = (e) => setCompleted(e.target.checked);

  const handleClick = () => {
    if (title) {
      dispatch(
        todoUpdated({
          id: todoId,
          title,
          completed,
        })
      );

      setError(null);
      navigate("/react-todo/list-todo");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <Container>
      <Row>
        <h1>Edit todo</h1>
      </Row>
      <Row>
        <Col md={3}>
          <TodoForm
            title={title}
            completed={completed}
            onTitleChange={handleTitleChange}
            onCompletedChange={handleCompletedChange}
            onSubmit={handleClick}
            error={error}
          />
        </Col>
      </Row>
    </Container>
  );
}
