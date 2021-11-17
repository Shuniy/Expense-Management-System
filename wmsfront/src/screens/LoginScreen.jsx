import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Image, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import Message from '../components/Message';

function LoginScreen(props) {

    const navigate = useNavigate();
    const redirect = "/";

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector((state) => state.userLogin);

    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
      if (userInfo) {
        navigate("/");
      }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Image
        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
        width="500px"
        height="350px"
      ></Image>

      {error && (
        <Message className="my-3" variant="danger">
          {error}! Try Reloading, If error persist, LOGIN AGAIN !!!
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="btn btn-primary" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3 my-3">
        <Col>
          New Customer?{" "}
          <Link to="/register">
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
