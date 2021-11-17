import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function AppHeader() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Wealth Management Application</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <Nav className="ms-auto">
              <Button variant="danger" onClick={logoutHandler}>
                Logout
              </Button>
            </Nav>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
