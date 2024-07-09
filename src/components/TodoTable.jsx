import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function TodoTable({ entities, searchQuery, startIndex, ITEMS_PER_PAGE, handleDelete }) {
  const filteredEntities = entities.filter((entity) =>
    entity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleEntities = filteredEntities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {visibleEntities.length ? (
          visibleEntities.map(({ id, title, completed }, i) => (
            <tr key={i}>
              <td>{id}</td>
              <td>{title}</td>
              <td>
                <Form.Check
                  disabled
                  checked={completed}
                />
              </td>
              <td>
                <Button onClick={() => handleDelete(id)}>Delete</Button>
                <Link to={`/react-todo/edit-todo/${id}`}>
                  <Button style={{ marginLeft: "10px" }}>Edit</Button>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No todos found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TodoTable;
