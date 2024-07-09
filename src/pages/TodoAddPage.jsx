import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { todoAdded } from "../slice/TodoSlice";
import { Container, Row, Col } from "react-bootstrap";
import { TodoForm } from "../components/TodoForm";

export function TodoAddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCompletedChange = (e) => setCompleted(e.target.checked);

  // const todosAmount = useSelector((state) => state.todos.entities.length);
  const todosAmount = 300; // fixed value for mock using jsonplaceholder

  const handleClick = () => {
    if (title) {
      dispatch(
        todoAdded({
          id: todosAmount + 1,
          title,
          completed,
        })
      );

      setError(null);
      navigate("/list-todo");
    } else {
      setError("Fill in all fields");
    }

    setTitle("");
    setCompleted(false);
  };

  return (
    <Container>
      <Row>
        <h1>Add todo</h1>
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
