import React, { useState } from "react";
import { todoDeleted } from "../slice/TodoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import TodoTable from "../components/TodoTable";
import PaginationBar from "../components/PaginationBar";

export function TodoListPage() {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    dispatch(todoDeleted({ id }));
  };

  const totalPages = Math.ceil(entities.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <Container>
      <Row>
        <h1>List todo</h1>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={12} sm={6} className="d-flex">
          <Link to="/add-todo">
            <Button className="button-primary me-2">Add todo</Button>
          </Link>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <TodoTable
              entities={entities}
              searchQuery={searchQuery}
              startIndex={startIndex}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              handleDelete={handleDelete}
            />
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Row>
    </Container>
  );
}
