import React from 'react';
import { Container, Card, Button, Image } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      <Card className="bg-light">
        <Card.Body>
          <Card.Title as="h1">Welcome to the Todo App!</Card.Title>
          <Image src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXRmdXZtNDlwdmI4ZXppNTZtbzlvanVueWF5Z2kzd3JzMGQ1ZmM2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BpGWitbFZflfSUYuZ9/giphy.gif" roundedCircle fluid />
          <hr className="my-4" />
          <Card.Text>
            Ready to conquer your tasks? Or at least think about conquering them? Click below!
          </Card.Text>
          <Button variant="primary" size="lg" href="/todo-react/list-todo">
            Show me the Todos!
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
