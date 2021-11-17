import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer(props) {
  const { children } = props;
  return (
    <Container>
      <Row className="justify-content-md-center my-2">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
