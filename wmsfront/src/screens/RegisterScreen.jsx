import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function RegisterScreen(props) {
  const navigate = useNavigate();

  const redirect = "/";

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not Match");
    } else {
      dispatch(register(fname, lname, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register New User Here</h1>
      <Image
        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
        width="500px"
        height="350px"
      ></Image>
      {message && (
        <Message className="my-3" variant="danger">
          {message}
        </Message>
      )}
      {error && (
        <Message className="my-3" variant="danger">
          {error}! Try Reloading, If error persist !!!
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="fname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={fname}
            required
            onChange={(event) => setFname(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lname}
            onChange={(event) => setLname(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="btn btn-primary" variant="primary" type="submit">
          Register
        </Button>
      </Form>

      <Row className="py-3 my-3">
        <Col>
          Have an account? <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
